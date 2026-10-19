function reorderElements(elements, targetGroup, elementId, toIndex) {
  function findElement(items, id) {
    for (const item of items) {
      if (String(item.id) === String(id)) {
        return item;
      }

      const found = findElement(item.children || [], id);

      if (found) return found;
    }

    return null;
  }

  function containsElement(element, id) {
    if (String(element.id) === String(id)) {
      return true;
    }

    return (element.children || []).some((child) => containsElement(child, id));
  }

  function getGroupInfo(group) {
    if (group === "canvas") {
      return { type: "canvas", id: null };
    }

    if (typeof group !== "string") return null;

    if (group.startsWith("columns-")) {
      return {
        type: "columns",
        id: group.slice("columns-".length),
      };
    }

    if (group.startsWith("column-")) {
      return {
        type: "column",
        id: group.slice("column-".length),
      };
    }

    if (group.startsWith("stack-")) {
      return {
        type: "stack",
        id: group.slice("stack-".length),
      };
    }

    return null;
  }

  function extractElement(items, id) {
    for (let i = 0; i < items.length; i++) {
      if (String(items[i].id) === String(id)) {
        const next = [...items];
        const [element] = next.splice(i, 1);

        return {
          elements: next,
          element,
        };
      }

      const children = items[i].children || [];
      const result = extractElement(children, id);

      if (result.element) {
        return {
          elements: items.map((item, index) =>
            index === i
              ? {
                  ...item,
                  children: result.elements,
                }
              : item,
          ),
          element: result.element,
        };
      }
    }

    return {
      elements: items,
      element: null,
    };
  }

  function insertElement(items, group, element, index) {
    const info = getGroupInfo(group);

    if (!info) return items;

    if (info.type === "canvas") {
      const next = [...items];

      const position = Math.max(
        0,
        Math.min(Number.isFinite(index) ? index : next.length, next.length),
      );

      next.splice(position, 0, element);

      return next;
    }

    return items.map((item) => {
      if (String(item.id) === info.id && item.type === info.type) {
        const children = [...(item.children || [])];

        const position = Math.max(
          0,
          Math.min(
            Number.isFinite(index) ? index : children.length,
            children.length,
          ),
        );

        children.splice(position, 0, element);

        return {
          ...item,
          children,
        };
      }

      if (item.children?.length) {
        return {
          ...item,
          children: insertElement(item.children, group, element, index),
        };
      }

      return item;
    });
  }

  const sourceElement = findElement(elements, elementId);

  if (!sourceElement) return elements;

  const targetInfo = getGroupInfo(targetGroup);

  if (!targetInfo) return elements;

  if (targetInfo.type !== "canvas") {
    const target = findElement(elements, targetInfo.id);

    if (!target || target.type !== targetInfo.type) {
      return elements;
    }

    if (containsElement(sourceElement, targetInfo.id)) {
      return elements;
    }

    if (targetInfo.type === "columns" && sourceElement.type !== "column") {
      return elements;
    }

    if (
      targetInfo.type === "column" &&
      !["image", "typography", "stack"].includes(sourceElement.type)
    ) {
      return elements;
    }

    if (
      targetInfo.type === "stack" &&
      !["image", "typography"].includes(sourceElement.type)
    ) {
      return elements;
    }
  } else {
    if (sourceElement.type === "column") {
      return elements;
    }
  }

  const extracted = extractElement(elements, elementId);

  if (!extracted.element) return elements;

  return insertElement(
    extracted.elements,
    targetGroup,
    extracted.element,
    toIndex,
  );
}

export default reorderElements;
