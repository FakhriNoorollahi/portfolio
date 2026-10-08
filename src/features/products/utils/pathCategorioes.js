export const getCategoryPath = (categories, categoryId) => {
  const path = [];

  let currentId = categoryId;

  while (currentId) {
    const category = categories.find((c) => c.id === currentId);

    if (!category) break;

    path.unshift(category);
    currentId = category.parentId;
  }

  return path;
};
