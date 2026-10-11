function findElement(elements, id) {
  for (const element of elements) {
    if (element.id === id) {
      return element;
    }

    const found = findElement(element.children || [], id);

    if (found) {
      return found;
    }
  }

  return null;
}

export default findElement;
