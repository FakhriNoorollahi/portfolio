export function saveDataLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getDataLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
