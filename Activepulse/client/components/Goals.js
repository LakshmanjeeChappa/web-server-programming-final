import { apiRequest } from "../services/api.js";

export default {
  data() {
    return {
      goals: [],
      form: { title: "", target_minutes: "", status: "active" },
      editingId: null,
      error: ""
    };
  },
  async mounted() { await this.loadGoals(); },
  methods: {
    async loadGoals() {
      try { this.goals = await apiRequest("/api/goals"); }
      catch (error) { this.error = error.message; }
    },
    async saveGoal() {
      try {
        const payload = { ...this.form, target_minutes: Number(this.form.target_minutes) };
        if (this.editingId) await apiRequest(`/api/goals/${this.editingId}`, "PUT", payload);
        else await apiRequest("/api/goals", "POST", payload);
        this.cancelEdit();
        await this.loadGoals();
      } catch (error) { this.error = error.message; }
    },
    editGoal(goal) {
      this.editingId = goal.id;
      this.form = { title: goal.title, target_minutes: goal.target_minutes, status: goal.status };
    },
    cancelEdit() {
      this.editingId = null;
      this.form = { title: "", target_minutes: "", status: "active" };
    },
    async deleteGoal(id) {
      try { await apiRequest(`/api/goals/${id}`, "DELETE"); await this.loadGoals(); }
      catch (error) { this.error = error.message; }
    }
  },
  template: `
    <main class="container two-column">
      <section class="card">
        <h1>{{editingId ? 'Edit Goal' : 'Create Fitness Goal'}}</h1>
        <input v-model="form.title" placeholder="Goal title" />
        <input v-model="form.target_minutes" type="number" placeholder="Target minutes" />
        <select v-model="form.status">
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="paused">Paused</option>
        </select>
        <button @click="saveGoal">{{editingId ? 'Update Goal' : 'Add Goal'}}</button>
        <button class="secondary" v-if="editingId" @click="cancelEdit">Cancel</button>
        <p class="error" v-if="error">{{error}}</p>
      </section>
      <section class="card">
        <h1>My Goals</h1>
        <div class="item" v-for="goal in goals" :key="goal.id">
          <div><strong>{{goal.title}}</strong><p>{{goal.target_minutes}} target minutes · {{goal.status}}</p></div>
          <div class="actions"><button @click="editGoal(goal)">Edit</button><button class="danger" @click="deleteGoal(goal.id)">Delete</button></div>
        </div>
      </section>
    </main>
  `
};
