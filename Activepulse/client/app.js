import { routes } from "./router.js";
import { store, logout } from "./services/dataService.js";

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.currentUser) return next("/");
  if (to.meta.adminOnly && store.currentUser?.role !== "admin") return next("/dashboard");
  next();
});

const app = Vue.createApp({
  data() {
    return { store };
  },
  methods: {
    logoutUser() {
      logout();
      this.$router.push("/");
    }
  },
  template: `
    <div>
      <nav v-if="store.currentUser">
        <div class="brand">ActivePulse</div>
        <div class="links">
          <router-link to="/dashboard">Dashboard</router-link>
          <router-link to="/workouts">Workouts</router-link>
          <router-link to="/goals">Goals</router-link>
          <router-link to="/types">Exercise Types</router-link>
          <router-link v-if="store.currentUser.role === 'admin'" to="/admin">Admin</router-link>
        </div>
        <div class="user-area">
          <span>{{store.currentUser.name}} ({{store.currentUser.role}})</span>
          <button @click="logoutUser">Logout</button>
        </div>
      </nav>
      <router-view></router-view>
    </div>
  `
});

app.use(router);
app.mount("#app");
