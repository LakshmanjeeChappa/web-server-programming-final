import { routes, protectRoute } from "./router.js";

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

protectRoute(router);

const app = Vue.createApp({});

app.use(router);

app.mount("#app");