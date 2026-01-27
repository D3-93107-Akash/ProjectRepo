/**
 * Centralized user context helper
 * --------------------------------
 * Reads userId from JWT payload
 */

export const getCurrentUserId = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("JWT token not found in localStorage");
    return null;
  }

  try {
    const payloadBase64 = token.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));

    if (!payload.userId) {
      console.warn("userId not found in JWT payload");
      return null;
    }

    return payload.userId;
  } catch (error) {
    console.error("Failed to decode JWT", error);
    return null;
  }
};
