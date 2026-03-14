const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const http = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`GET ${endpoint} failed: ${response.status}`);
    return response.json() as Promise<T>;
  },

  post: async <T, B = unknown>(endpoint: string, body: B): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`POST ${endpoint} failed: ${response.status}`);
    return response.json() as Promise<T>;
  },

  put: async <T, B = unknown>(endpoint: string, body: B): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`PUT ${endpoint} failed: ${response.status}`);
    return response.json() as Promise<T>;
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`DELETE ${endpoint} failed: ${response.status}`);
    return response.json() as Promise<T>;
  },
};

export default http;
