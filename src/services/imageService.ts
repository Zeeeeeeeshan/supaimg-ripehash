const BASE_URL: string = (import.meta as any)?.env?.VITE_API_BASE_URL || '';

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export type ImageRecord = {
  image_id: number;
  user_id: number;
  bucket_name: string;
  image_url: string;
  size?: number;
  project_name?: string;
  uploaded_at: string;
};

export async function createImage(payload: {
  user_id: number;
  bucket_name: string;
  image_url: string;
  size?: number;
  project_name?: string;
}): Promise<ApiResponse<ImageRecord>> {
  const res = await fetch(`${BASE_URL}/api/images`, {
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
