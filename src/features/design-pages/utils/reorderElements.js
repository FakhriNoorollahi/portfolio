function reorderElements(elements, group, fromIndex, toIndex) {
  if (group === "canvas") {
    const result = [...elements];

    if (
      fromIndex < 0 ||
      toIndex < 0 ||
      fromIndex >= result.length ||
      toIndex >= result.length
    ) {
      return elements;
    }

    const [moved] = result.splice(fromIndex, 1);
    result.splice(toIndex, 0, moved);

    return result;
  }

  const stackId = group.startsWith("stack-")
    ? group.slice("stack-".length)
    : null;

  if (!stackId) return elements;

  return elements.map((element) => {
    if (String(element.id) === stackId && element.type === "stack") {
      const children = [...element.children];

      if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= children.length ||
        toIndex >= children.length
      ) {
        return element;
      }

      const [moved] = children.splice(fromIndex, 1);
      children.splice(toIndex, 0, moved);

      return { ...element, children };
    }

    if (element.type === "stack" && element.children?.length) {
      return {
        ...element,
        children: reorderElements(element.children, group, fromIndex, toIndex),
      };
    }

    return element;
  });
}

export default reorderElements;
