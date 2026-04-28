import { apiRequest } from "../services/api.js";

export default {
  data() {
    return {
      users: [],
      form: { name: "", username: "", password: "", role: "user" },
      editingId: null,
      error: ""
    };
  },
  async mounted() { await this.loadUsers(); },
  methods: {
    async loadUsers() {
      try { this.users = await apiRequest("/api/users"); }
      catch (error) { this.error = error.message; }
    },
    async saveUser() {
      try {
        if (this.editingId) {
          await apiRequest(`/api/users/${this.editingId}`, "PUT", {
            name: this.form.name,
            username: this.form.username,
            role: this.form.role
          });
        } else {
          await apiRequest("/api/users/register", "POST", this.form);
        }
        this.cancelEdit();
        await this.loadUsers();
      } catch (error) { this.error = error.message; }
    },
    editUser(user) {
      this.editingId = user.id;
      this.form = { name: user.name, username: user.username, password: "", role: user.role };
    },
    cancelEdit() { this.editingId = null; this.form = { name: "", username: "", password: "", role: "user" }; },
    async deleteUser(id) {
      try { await apiRequest(`/api/users/${id}`, "DELETE"); await this.loadUsers(); }
      catch (error) { this.error = error.message; }
    }
  },
  template: `
    <main class="container two-column">
      <section class="card">
        <h1>User Control Panel</h1>
        <p class="error" v-if="error">{{error}}</p>
        <div class="item" v-for="user in users" :key="user.id">
          <div><strong>{{user.name}}</strong><p>{{user.username}} · {{user.role}}</p></div>
          <div class="actions"><button @click="editUser(user)">Edit</button><button class="danger" @click="deleteUser(user.id)">Delete</button></div>
        </div>
      </section>
      <section class="card">
        <h1>{{editingId ? 'Edit User' : 'Create User'}}</h1>
        <input v-model="form.name" placeholder="Name" />
        <input v-model="form.username" placeholder="Username" />
        <input v-if="!editingId" v-model="form.password" type="password" placeholder="Password" />
        <select v-model="form.role"><option value="user">User</option><option value="admin">Admin</option></select>
        <button @click="saveUser">{{editingId ? 'Update User' : 'Add User'}}</button>
        <button class="secondary" v-if="editingId" @click="cancelEdit">Cancel</button>
      </section>
    </main>
  `
};
