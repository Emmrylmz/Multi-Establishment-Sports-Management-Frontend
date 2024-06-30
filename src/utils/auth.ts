// utils/auth.js
import jwtDecode from 'jwt-decode';

export const isTokenAboutToExpire = (token, thresholdInSeconds = 300) => {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = decoded.exp;

    return expirationTime - currentTime < thresholdInSeconds;
  } catch (e) {
    return false;
  }
};
