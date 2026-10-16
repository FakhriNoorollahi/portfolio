function moveItem(items, fromIndex, toIndex) {
  if (
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= items.length ||
    toIndex >= items.length
  ) {
    return items;
  }

  const next = [...items];
  const [movedItem] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, movedItem);

  return next;
}

export function reorderStackChildren(elements, group, initialIndex, index) {
  if (!Array.isArray(elements)) return elements;

  const stackId = String(group).startsWith("stack-")
    ? String(group).slice("stack-".length)
    : String(group);

  function update(items) {
    let changed = false;

    const next = items.map((element) => {
      if (String(element.id) === stackId && Array.isArray(element.children)) {
        changed = true;

        return {
          ...element,
          children: moveItem(element.children, initialIndex, index),
        };
      }

      if (Array.isArray(element.children)) {
        const updatedChildren = update(element.children);

        if (updatedChildren !== element.children) {
          changed = true;

          return {
            ...element,
            children: updatedChildren,
          };
        }
      }

      return element;
    });

    return changed ? next : items;
  }

  return update(elements);
}
