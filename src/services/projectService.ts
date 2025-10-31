const BASE_URL: string = (import.meta as any)?.env?.VITE_API_BASE_URL || '';

export type Project = {
  project_id: number;
  user_id: number;
  project_name: string;
  image_url?: string | null;
  created_at: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export async function createProject(payload: { user_id: number; project_name: string; image_url?: string }): Promise<ApiResponse<Project>> {
  const res = await fetch(`${BASE_URL}/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || `Request failed: ${res.status}`);
  return data;
}

export async function getUserProjects(userId: number): Promise<ApiResponse<Project[]>> {
  const res = await fetch(`${BASE_URL}/api/projects/user/${userId}`, {
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || `Request failed: ${res.status}`);
  return data;
}

export async function updateProject(id: number, payload: Partial<{ project_name: string; image_url?: string }>): Promise<ApiResponse<Project>> {
  const res = await fetch(`${BASE_URL}/api/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || `Request failed: ${res.status}`);
  return data;
}

export async function deleteProject(id: number): Promise<ApiResponse<{ deleted: boolean }>> {
  const res = await fetch(`${BASE_URL}/api/projects/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || `Request failed: ${res.status}`);
  return data;
}
