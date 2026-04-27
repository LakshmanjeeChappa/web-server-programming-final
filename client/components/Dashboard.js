import { apiRequest } from "../services/api.js";

export default {

  data() {
    return {
      activities: []
    };
  },

  async mounted() {
    this.activities = await apiRequest("/api/activities");
  },

  computed: {
    totalDuration() {
      return this.activities.reduce((sum, a) => sum + a.duration, 0);
    }
  },

  template: `
  <div class="container">
    <div class="card">
      <h2>Dashboard</h2>
      <p>Total Activities: {{activities.length}}</p>
      <p>Total Duration: {{totalDuration}} mins</p>
    </div>
  </div>
  `
};