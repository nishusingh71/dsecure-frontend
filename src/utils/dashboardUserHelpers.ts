/**
 * Shared dashboard utility functions for user-related data retrieval.
 * Consolidates duplicated logic previously spread across multiple dashboard pages.
 */

interface StoredUserData {
  userEmail?: string;
  user_email?: string;
  email?: string;
  userRole?: string;
  role?: string;
  user_role?: string;
  user_group?: string;
  groupId?: string;
  group_id?: string;
}

/**
 * Helper to retrieve and parse user data from localStorage or sessionStorage.
 */
export const getStoredUserData = (): StoredUserData | null => {
  try {
    const storedUser = localStorage.getItem("user_data");
    const authUser = localStorage.getItem("authUser");
    
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    if (authUser) {
      return JSON.parse(authUser);
    }

    // fallback to sessionStorage check if useAuth or other mechanisms place it there
    const sessionUser = sessionStorage.getItem("user_data");
    if (sessionUser) {
      return JSON.parse(sessionUser);
    }
  } catch (e) {
    console.error("Error parsing stored user data:", e);
  }
  return null;
};

/**
 * Gets the current user's email with multiple fallback keys.
 */
export const getUserEmail = (fallbackEmail?: string): string => {
  // Check demo mode first
  if (localStorage.getItem("demo_mode") === "true") {
    return "admin@dsecure.com";
  }

  const data = getStoredUserData();
  return (
    data?.userEmail ||
    data?.user_email ||
    data?.email ||
    fallbackEmail ||
    ""
  );
};

/**
 * Gets the current user's role with multiple fallback keys.
 */
export const getUserRole = (fallbackRole?: string): string => {
  // Check demo mode first
  if (localStorage.getItem("demo_mode") === "true") {
    return "superadmin";
  }

  const data = getStoredUserData();
  return (
    data?.userRole ||
    data?.role ||
    data?.user_role ||
    fallbackRole ||
    "user"
  );
};

/**
 * Gets the current user's group ID with multiple fallback keys.
 */
export const getUserGroupId = (): string | null => {
  const data = getStoredUserData();
  return (
    data?.user_group ||
    data?.groupId ||
    data?.group_id ||
    null
  );
};
