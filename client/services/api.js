const API_URL = "https://fitness-tracker-pb94.onrender.com";

export async function apiRequest(path, method = "GET", data = null) {
  const token = localStorage.getItem("token");

  const res = await fetch(API_URL + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: "Bearer " + token })
    },
    body: data ? JSON.stringify(data) : null
  });

  return res.json();
}