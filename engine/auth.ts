export type Role = "reader" | "writer" | "dev";

export interface User {
  name: string;
  email: string;
  password: string;
  role: Role;
  loggedIn: boolean;
}

const KEY = "narrative_user";

/**
 * Save user (signup)
 */
export function saveUser(user: User) {
  if (typeof window === "undefined") return;

  localStorage.setItem(KEY, JSON.stringify(user));
}

/**
 * Get user
 */
export function getUser(): User | null {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem(KEY);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

/**
 * LOGIN (REAL AUTH CHECK)
 */
export function login(email: string, password: string): boolean {
  const user = getUser();

  if (!user) return false;

  const valid =
    user.email === email &&
    user.password === password;

  if (!valid) return false;

  saveUser({
    ...user,
    loggedIn: true,
  });

  return true;
}

/**
 * Logout
 */
export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

/**
 * Auth state
 */
export function isLoggedIn(): boolean {
  return getUser()?.loggedIn === true;
}

/**
 * Role helper
 */
export function getRole(): Role | null {
  return getUser()?.role || null;
}