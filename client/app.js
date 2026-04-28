import { routes, protectRoute } from "./router.js";
import { store } from "./services/dataService.js";

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

protectRoute(router);

// ✅ restore user properly
const savedUser = localStorage.getItem("user");
if (savedUser) {
  store.currentUser = JSON.parse(savedUser);
}

const app = Vue.createApp({});

app.use(router);

app.mount("#app");