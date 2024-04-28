export const TokenTypes = Object.freeze({
  ACCESS: '@access_token',
});

export const storeToken = (type, token) => {
  try {
    localStorage.setItem(TokenTypes[type], token);
  } catch (e) {
    console.error(e);
  }
};

export const getToken = (type) => {
  try {
    const value = localStorage.getItem(TokenTypes[type]);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error(e);
  }

  return null;
};

export const removeToken = (type) => {
  try {
    localStorage.removeItem(TokenTypes[type]);
  } catch (e) {
    console.error(e);
  }
};

export const clear = () => {
  try {
    localStorage.removeItem(TokenTypes.ACCESS);
  } catch (e) {
    console.error(e);
  }
};
