function addChildToStack(elements, stackId, newElement) {
  return elements.map((element) => {
    if (String(element.id) === String(stackId)) {
      return {
        ...element,
        children: [...(element.children || []), newElement],
      };
    }

    if (element.children?.length) {
      return {
        ...element,
        children: addChildToStack(element.children, stackId, newElement),
      };
    }

    return element;
  });
}

export default addChildToStack;
