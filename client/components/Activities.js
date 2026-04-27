import { apiRequest } from "../services/api.js";

export default {

  data() {
    return {
      activities: [],
      type: "",
      duration: "",
      editingId: null
    };
  },

  async mounted() {
    this.loadActivities();
  },

  methods: {

    async loadActivities() {
      this.activities = await apiRequest("/api/activities");
    },

    async addActivity() {
      await apiRequest("/api/activities", "POST", {
        type: this.type,
        duration: Number(this.duration),
        date: new Date().toISOString().split("T")[0]
      });

      this.type = "";
      this.duration = "";

      this.loadActivities();
    },

    async deleteActivity(id) {
      await apiRequest(`/api/activities/${id}`, "DELETE");
      this.loadActivities();
    },

    editActivity(activity) {
      this.type = activity.type;
      this.duration = activity.duration;
      this.editingId = activity.id;
    },

    async updateActivity() {
      await apiRequest(`/api/activities/${this.editingId}`, "PUT", {
        type: this.type,
        duration: Number(this.duration),
        date: new Date().toISOString().split("T")[0]
      });

      this.type = "";
      this.duration = "";
      this.editingId = null;

      this.loadActivities();
    }

  },

  template: `

  <div>

    <div class="container">

      <div class="card">

        <h2>Your Activities</h2>

        <ul>

          <li v-for="a in activities" :key="a.id" class="activity-row">

            <span>{{a.type}} - {{a.duration}} mins</span>

            <div class="activity-buttons">
              <button @click="editActivity(a)">Edit</button>
              <button @click="deleteActivity(a.id)">Delete</button>
            </div>

          </li>

        </ul>

      </div>

      <div class="card">

        <h3 v-if="editingId==null">Add Activity</h3>
        <h3 v-else>Edit Activity</h3>

        <input v-model="type" placeholder="Activity">
        <input v-model="duration" placeholder="Duration">

        <button v-if="editingId==null" @click="addActivity">Add</button>
        <button v-else @click="updateActivity">Update</button>

      </div>

    </div>

  </div>

  `
};