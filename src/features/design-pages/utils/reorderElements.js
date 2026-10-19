function reorderElements(elements, targetGroup, elementId, toIndex) {
  function findElement(items, id) {
    for (const item of items) {
      if (String(item.id) === String(id)) return item;

      const found = findElement(item.children || [], id);
      if (found) return found;
    }

    return null;
  }

  function containsElement(element, id) {
    if (String(element.id) === String(id)) return true;

    return (element.children || []).some((child) => containsElement(child, id));
  }

  function extractElement(items, id) {
    for (let i = 0; i < items.length; i++) {
      if (String(items[i].id) === String(id)) {
        const next = [...items];
        const [element] = next.splice(i, 1);

        return { elements: next, element };
      }

      const children = items[i].children || [];
      const result = extractElement(children, id);

      if (result.element) {
        return {
          elements: items.map((item, index) =>
            index === i ? { ...item, children: result.elements } : item,
          ),
          element: result.element,
        };
      }
    }

    return { elements: items, element: null };
  }

  function insertElement(items, group, element, index) {
    if (group === "canvas") {
      const next = [...items];
      const position = Math.max(
        0,
        Math.min(Number.isFinite(index) ? index : next.length, next.length),
      );

      next.splice(position, 0, element);
      return next;
    }

    if (!group?.startsWith("stack-")) return items;

    const stackId = group.slice("stack-".length);

    return items.map((item) => {
      if (String(item.id) === stackId && item.type === "stack") {
        const children = [...(item.children || [])];
        const position = Math.max(
          0,
          Math.min(
            Number.isFinite(index) ? index : children.length,
            children.length,
          ),
        );

        children.splice(position, 0, element);
        return { ...item, children };
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

  if (targetGroup !== "canvas") {
    if (!targetGroup?.startsWith("stack-")) return elements;

    const targetStackId = targetGroup.slice("stack-".length);
    const targetStack = findElement(elements, targetStackId);

    if (!targetStack || targetStack.type !== "stack") return elements;
  }

  const sourceElement = findElement(elements, elementId);
  if (!sourceElement) return elements;

  if (sourceElement.type === "stack" && targetGroup !== "canvas") {
    const targetStackId = targetGroup.slice("stack-".length);

    if (containsElement(sourceElement, targetStackId)) {
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
