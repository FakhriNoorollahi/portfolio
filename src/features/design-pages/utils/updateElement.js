function updateElement(elements, id, propName, value) {
  return elements.map((element) => {
    if (element.id === id) {
      return {
        ...element,
        props: {
          ...element.props,
          [propName]: value,
        },
      };
    }

    return {
      ...element,
      children: updateElement(element.children || [], id, propName, value),
    };
  });
}

export default updateElement;
