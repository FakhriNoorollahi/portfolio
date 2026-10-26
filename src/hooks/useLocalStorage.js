// export function saveDataLocalStorage(key, value) {
//   localStorage.setItem(key, JSON.stringify(value));
// }

// export function getDataLocalStorage(key) {
//   return JSON.parse(localStorage.getItem(key)) || [];
// }

export function getDataLocalStorage(key) {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return [];
  }
}

export function saveDataLocalStorage(key, data) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving localStorage key "${key}":`, error);
  }
}
