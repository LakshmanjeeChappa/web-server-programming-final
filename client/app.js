import { routes, protectRoute } from "./router.js";

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

protectRoute(router);

// ✅ ADD THIS PART HERE
const savedUser = localStorage.getItem("user");
if (savedUser) {
  window.currentUser = JSON.parse(savedUser);
}

const app = Vue.createApp({});

app.use(router);

app.mount("#app");