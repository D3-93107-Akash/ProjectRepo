/**
 * Centralized user context helper
 * --------------------------------
 * TEMP implementation (pre-JWT):
 * - Returns a hardcoded userId
 * - MUST be replaced when JWT is added
 *
 *  IMPORTANT:
 * - Components and API services must NOT hardcode userId
 * - Only this file will change when JWT is introduced
 */
export const getCurrentUserId = () => {
  return 6; // TEMP: replace with JWT-derived userId later
};
