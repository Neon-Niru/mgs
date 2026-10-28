const BASE = "https://mgs-kirthik.onrender.com/api";

async function request(endpoint, options = {}) {
  // Check multiple common localStorage keys for the auth token
  const token = 
    localStorage.getItem("token") || 
    localStorage.getItem("access_token") || 
    localStorage.getItem("jwt");

  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${endpoint}`, {
    ...options,
    headers: { ...headers, ...options.headers },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data.error || `Request failed (${res.status})`);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

// (Keep all your existing export const auth, chat, planner, etc. below this)
