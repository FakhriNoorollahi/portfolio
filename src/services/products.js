import axios from "axios";

const api = "https://dummyjson.com/";

export async function getProducts({
  search = "",
  limit = 10,
  skip = 0,
  select,
  sortBy,
  order,
  category,
} = {}) {
  // const endpoint = search ? "products/search" : "products";
  let endpoint = "products";

  if (category) {
    endpoint = `products/category/${category}`;
  } else if (search) {
    endpoint = "products/search";
  }

  const params = {
    limit,
    skip,
  };

  if (search) {
    params.q = search;
  }
  if (select) {
    params.select = select;
  }

  if (sortBy) {
    params.sortBy = sortBy;
  }

  if (order) {
    params.order = order;
  }

  return await axios.get(`${api}/${endpoint}`, {
    params,
  });
}

export async function getProductById(id) {
  return await axios.get(`${api}/products/${id}`);
}
