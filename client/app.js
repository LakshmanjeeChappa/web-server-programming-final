import { routes, protectRoute } from "./router.js"

const router = VueRouter.createRouter({

history: VueRouter.createWebHashHistory(),
routes

})

protectRoute(router)

const app = Vue.createApp({})

app.use(router)

app.mount("#app")

const path = require("path");

app.use(express.static(path.join(__dirname, "../client")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});
