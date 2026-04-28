import { apiRequest } from "../services/api.js";
import { setUser } from "../services/dataService.js";

export default {
  data() {
    return {
      mode: "login",
      name: "",
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async login() {
      try {
        this.error = "";
        const result = await apiRequest("/api/users/login", "POST", {
          username: this.username,
          password: this.password
        });
        setUser(result.user, result.token);
        this.$router.push("/dashboard");
      } catch (error) {
        this.error = error.message;
      }
    },
    async register() {
      try {
        this.error = "";
        await apiRequest("/api/users/register", "POST", {
          name: this.name,
          username: this.username,
          password: this.password,
          role: "user"
        });
        await this.login();
      } catch (error) {
        this.error = error.message;
      }
    }
  },
  template: `
    <main class="login-page">
      <section class="login-card">
        <h1>ActivePulse Tracker</h1>
        <p class="muted">Log workouts, calories, exercise types, and weekly goals.</p>

        <div class="tab-row">
          <button :class="{secondary: mode !== 'login'}" @click="mode='login'">Login</button>
          <button :class="{secondary: mode !== 'register'}" @click="mode='register'">Register</button>
        </div>

        <input v-if="mode === 'register'" v-model="name" placeholder="Full name" />
        <input v-model="username" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />

        <button class="full" v-if="mode === 'login'" @click="login">Login</button>
        <button class="full" v-else @click="register">Create Account</button>

        <p class="error" v-if="error">{{error}}</p>
        <div class="demo-box">
          <strong>Demo accounts</strong><br />
          Admin: admin / 123<br />
          User: john / 123
        </div>
      </section>
    </main>
  `
};
