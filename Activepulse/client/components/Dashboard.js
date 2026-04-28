import { apiRequest } from "../services/api.js";

export default {
  data() {
    return {
      summary: { totalWorkouts: 0, totalMinutes: 0, totalCalories: 0, averageDuration: 0 },
      goals: [],
      error: ""
    };
  },
  async mounted() {
    await this.loadDashboard();
  },
  methods: {
    async loadDashboard() {
      try {
        this.summary = await apiRequest("/api/workouts/summary");
        this.goals = await apiRequest("/api/goals");
      } catch (error) {
        this.error = error.message;
      }
    }
  },
  template: `
    <main class="container">
      <h1>Fitness Overview</h1>
      <p class="muted">Your personal progress summary from server-side data.</p>
      <p class="error" v-if="error">{{error}}</p>

      <section class="stats-grid">
        <div class="stat-card"><span>{{summary.totalWorkouts}}</span><p>Total Workouts</p></div>
        <div class="stat-card"><span>{{summary.totalMinutes}}</span><p>Total Minutes</p></div>
        <div class="stat-card"><span>{{summary.totalCalories}}</span><p>Calories Burned</p></div>
        <div class="stat-card"><span>{{summary.averageDuration}}</span><p>Average Minutes</p></div>
      </section>

      <section class="card">
        <h2>Current Goals</h2>
        <p v-if="goals.length === 0" class="muted">No goals yet. Add one from the Goals page.</p>
        <ul class="clean-list">
          <li v-for="goal in goals" :key="goal.id">
            <strong>{{goal.title}}</strong> — {{goal.target_minutes}} minutes — {{goal.status}}
          </li>
        </ul>
      </section>
    </main>
  `
};
