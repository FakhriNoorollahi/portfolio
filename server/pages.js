import axios from "axios";

const api = "http://localhost:3000/api";

export async function createPage(page) {
  const response = await axios.post(`${api}/pages`, page);
  return response.data;
}

export async function getPageById(id) {
  const response = await axios.get(`${api}/pages/${id}`);
  return response.data;
}

export async function updatePage(id, data) {
  const response = await axios.put(`${api}/pages/${id}`, data);
  return response.data;
}
