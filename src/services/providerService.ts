export type CreateProviderPayload = {
  user_id: number;
  provider_name: string;
  bucket_name: string;
  region: string;
  access_key: string;
  secret_key_id: string;
};

const BASE_URL: string = (import.meta as any)?.env?.VITE_API_BASE_URL || '';

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export type Provider = {
  provider_id: number;
  user_id: number;
  provider_name: string;
  bucket_name: string;
  region: string;
  access_key: string;
  secret_key_id: string;
  created_at: string;
};

export async function createProvider(payload: CreateProviderPayload): Promise<ApiResponse<Provider>> {
  const res = await fetch(`${BASE_URL}/api/providers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || `Request failed with status ${res.status}`);
  }
  return data;
}

export async function getUserProviders(userId: number): Promise<ApiResponse<Provider[]>> {
  const res = await fetch(`${BASE_URL}/api/providers/user/${userId}`, {
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || `Request failed with status ${res.status}`);
  }
  return data;
}
