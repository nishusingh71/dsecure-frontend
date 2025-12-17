/*
  FRONTEND PII-SAFE UTILITY:
  - Encodes email addresses to Base64 before sending in headers/URLs
  - Prevents raw email exposure in browser Network tab
  - Use this for all email transmission to backend
*/

/**
 * Encodes an email address to Base64 format
 * @param email - Raw email address
 * @returns Base64 encoded email string
 */
export const encodeEmail = (email: string | null | undefined): string => {
  if (!email) return '';
  try {
    return btoa(email);
  } catch (error) {
    console.error('Failed to encode email:', error);
    return '';
  }
};

/**
 * Decodes a Base64 encoded email address (for testing/debugging only)
 * @param encodedEmail - Base64 encoded email
 * @returns Decoded email address
 */
export const decodeEmail = (encodedEmail: string): string => {
  if (!encodedEmail) return '';
  try {
    return atob(encodedEmail);
  } catch (error) {
    console.error('Failed to decode email:', error);
    return '';
  }
};

/**
 * Checks if a string contains an unencoded email pattern
 * @param str - String to check
 * @returns true if raw email found
 */
export const containsRawEmail = (str: string): boolean => {
  const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
  return emailPattern.test(str);
};
