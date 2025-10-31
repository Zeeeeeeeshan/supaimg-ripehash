const BASE_URL: string = (import.meta as any)?.env?.VITE_API_BASE_URL || '';

export type CreateUserPayload = {
  name: string;
  gmail: string;
  password: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export type User = {
  user_id: number;
  name: string;
  gmail: string;
  created_at: string;
};

export async function createUser(payload: CreateUserPayload): Promise<ApiResponse<User>> {
  const res = await fetch(`${BASE_URL}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || `Request failed with status ${res.status}`);
  }
  return data;
}

export async function getUser(userId: number): Promise<ApiResponse<User>> {
  const res = await fetch(`${BASE_URL}/api/users/${userId}`, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || `Request failed with status ${res.status}`);
  }
  return data;
}

export async function updateUser(userId: number, payload: Partial<CreateUserPayload>): Promise<ApiResponse<User>> {
  const res = await fetch(`${BASE_URL}/api/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || `Request failed with status ${res.status}`);
  }
  return data;
}

export function setCookie(name: string, value: string, days = 7) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
}

export function getCookie(name: string): string | null {
  const cname = name + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let c of ca) {
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(cname) === 0) return c.substring(cname.length, c.length);
  }
  return null;
}

export function eraseCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
