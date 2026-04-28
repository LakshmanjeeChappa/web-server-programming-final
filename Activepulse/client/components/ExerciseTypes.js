import { apiRequest } from "../services/api.js";
import { store } from "../services/dataService.js";

export default {
  data() {
    return { store, types: [], form: { name: "", description: "" }, editingId: null, error: "" };
  },
  async mounted() { await this.loadTypes(); },
  methods: {
    async loadTypes() {
      try { this.types = await apiRequest("/api/exercise-types"); }
      catch (error) { this.error = error.message; }
    },
    async saveType() {
      try {
        if (this.editingId) await apiRequest(`/api/exercise-types/${this.editingId}`, "PUT", this.form);
        else await apiRequest("/api/exercise-types", "POST", this.form);
        this.cancelEdit();
        await this.loadTypes();
      } catch (error) { this.error = error.message; }
    },
    editType(type) { this.editingId = type.id; this.form = { name: type.name, description: type.description || "" }; },
    cancelEdit() { this.editingId = null; this.form = { name: "", description: "" }; },
    async deleteType(id) {
      try { await apiRequest(`/api/exercise-types/${id}`, "DELETE"); await this.loadTypes(); }
      catch (error) { this.error = error.message; }
    }
  },
  template: `
    <main class="container two-column">
      <section class="card">
        <h1>Exercise Types</h1>
        <p class="muted">These categories are stored in the database and used while logging workouts.</p>
        <p class="error" v-if="error">{{error}}</p>
        <div class="item" v-for="type in types" :key="type.id">
          <div><strong>{{type.name}}</strong><p>{{type.description}}</p></div>
          <div class="actions" v-if="store.currentUser?.role === 'admin'">
            <button @click="editType(type)">Edit</button>
            <button class="danger" @click="deleteType(type.id)">Delete</button>
          </div>
        </div>
      </section>
      <section class="card" v-if="store.currentUser?.role === 'admin'">
        <h1>{{editingId ? 'Edit Type' : 'Add Type'}}</h1>
        <input v-model="form.name" placeholder="Exercise type name" />
        <textarea v-model="form.description" placeholder="Description"></textarea>
        <button @click="saveType">{{editingId ? 'Update Type' : 'Add Type'}}</button>
        <button class="secondary" v-if="editingId" @click="cancelEdit">Cancel</button>
      </section>
    </main>
  `
};
