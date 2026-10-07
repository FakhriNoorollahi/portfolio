import axios from "axios";

const api = "https://dummyjson.com/products";

export async function getCategories() {
  return await axios.get(`${api}/categories`);
}
