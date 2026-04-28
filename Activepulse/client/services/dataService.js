export const store = Vue.reactive({
  currentUser: JSON.parse(localStorage.getItem("user") || "null"),
  message: ""
});

export function setUser(user, token) {
  store.currentUser = user;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
}

export function logout() {
  store.currentUser = null;
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}
