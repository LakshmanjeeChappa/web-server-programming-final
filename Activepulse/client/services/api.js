const API_URL = "";

export async function apiRequest(path, method = "GET", data = null) {
  const token = localStorage.getItem("token");
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  };

  if (data) options.body = JSON.stringify(data);

  const res = await fetch(API_URL + path, options);
  const payload = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(payload.error || "Request failed");
  }

  return payload;
}
