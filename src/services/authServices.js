import api from "./api";

export const loginUser = async ({ username, password }) => {
  return await api.post("auth/login", { username, password });
};

export const registerUser = async ({ username, password }) => {
  return await api.post("auth/register", { username, password });
};
