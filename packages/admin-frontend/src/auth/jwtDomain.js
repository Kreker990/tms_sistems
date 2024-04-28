/* eslint-disable import/prefer-default-export */
import jwtDecode from 'jwt-decode';

export function isTokenExpired(token) {
  try {
    const decodedToken = jwtDecode(token);
    const expirationDate = new Date(decodedToken.exp * 1000); // Convert to milliseconds

    if (expirationDate < new Date()) {
      return true;
    }
    return false;
  } catch (error) {
    return true;
  }
}
