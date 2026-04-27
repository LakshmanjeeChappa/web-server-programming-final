import { apiRequest } from "../services/api.js";

export default {

  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },

  methods: {

    async login() {
      const res = await apiRequest("/api/users/login", "POST", {
        username: this.username,
        password: this.password
      });

      if (res.token) {
        localStorage.setItem("token", res.token);
        this.$router.push("/dashboard");
      } else {
        this.error = "Login failed";
      }
    }

  },

  template: `

  <div class="container">

    <div class="card">

      <h2>Fitness Tracker Login</h2>

      <input v-model="username" placeholder="Username">

      <input v-model="password" type="password" placeholder="Password">

      <button @click="login">Login</button>

      <p style="color:red">{{error}}</p>

      <p style="margin-top:10px; font-size:14px; color:#555;">
      Demo Accounts:<br>
      Admin → <b>admin</b> / <b>123</b><br>
      User → <b>john</b> / <b>123</b>
      </p>

    </div>

  </div>

  `
};