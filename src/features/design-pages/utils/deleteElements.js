function deleteElement(elements, id) {
  return elements
    .filter((element) => element.id !== id)
    .map((element) => ({
      ...element,
      children: deleteElement(element.children || [], id),
    }));
}

export default deleteElement;
