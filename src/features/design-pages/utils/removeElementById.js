function removeElementById(id, elements) {
  return elements
    .filter((elm) => elm.id !== id)
    .map((elm) => {
      if (elm.children.length > 0) {
        return {
          ...elm,
          children: removeElementById(id, elm.children),
        };
      }
      return elm;
    });
}

export default removeElementById;
