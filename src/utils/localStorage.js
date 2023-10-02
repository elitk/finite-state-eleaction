export const setLocalStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to set item to localStorage:', error);
  }
};

export const getLocalStorageItem = (key) => !!localStorage.getItem(key);
