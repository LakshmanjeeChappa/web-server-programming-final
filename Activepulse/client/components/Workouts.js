import { apiRequest } from "../services/api.js";

export default {
  data() {
    return {
      workouts: [],
      types: [],
      form: this.emptyForm(),
      editingId: null,
      error: "",
      message: ""
    };
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    emptyForm() {
      return {
        title: "",
        exercise_type_id: "",
        duration: "",
        calories: "",
        workout_date: new Date().toISOString().split("T")[0],
        notes: ""
      };
    },
    async loadData() {
      try {
        this.workouts = await apiRequest("/api/workouts");
        this.types = await apiRequest("/api/exercise-types");
      } catch (error) {
        this.error = error.message;
      }
    },
    async saveWorkout() {
      try {
        this.error = "";
        const payload = {
          ...this.form,
          exercise_type_id: this.form.exercise_type_id || null,
          duration: Number(this.form.duration),
          calories: Number(this.form.calories || 0)
        };
        if (this.editingId) {
          await apiRequest(`/api/workouts/${this.editingId}`, "PUT", payload);
          this.message = "Workout updated";
        } else {
          await apiRequest("/api/workouts", "POST", payload);
          this.message = "Workout added";
        }
        this.cancelEdit();
        await this.loadData();
      } catch (error) {
        this.error = error.message;
      }
    },
    editWorkout(workout) {
      this.editingId = workout.id;
      this.form = {
        title: workout.title,
        exercise_type_id: workout.exercise_type_id || "",
        duration: workout.duration,
        calories: workout.calories,
        workout_date: String(workout.workout_date).split("T")[0],
        notes: workout.notes || ""
      };
    },
    cancelEdit() {
      this.editingId = null;
      this.form = this.emptyForm();
    },
    async deleteWorkout(id) {
      try {
        await apiRequest(`/api/workouts/${id}`, "DELETE");
        await this.loadData();
      } catch (error) {
        this.error = error.message;
      }
    }
  },
  template: `
    <main class="container two-column">
      <section class="card">
        <h1>{{editingId ? 'Edit Workout' : 'Log Workout'}}</h1>
        <input v-model="form.title" placeholder="Workout title, e.g. Morning run" />
        <select v-model="form.exercise_type_id">
          <option value="">Select exercise type</option>
          <option v-for="type in types" :key="type.id" :value="type.id">{{type.name}}</option>
        </select>
        <input v-model="form.duration" type="number" placeholder="Duration in minutes" />
        <input v-model="form.calories" type="number" placeholder="Calories burned" />
        <input v-model="form.workout_date" type="date" />
        <textarea v-model="form.notes" placeholder="Notes"></textarea>
        <button @click="saveWorkout">{{editingId ? 'Update Workout' : 'Add Workout'}}</button>
        <button class="secondary" v-if="editingId" @click="cancelEdit">Cancel</button>
        <p class="error" v-if="error">{{error}}</p>
        <p class="success" v-if="message">{{message}}</p>
      </section>

      <section class="card">
        <h1>My Workouts</h1>
        <p class="muted" v-if="workouts.length === 0">No workouts logged yet.</p>
        <div class="item" v-for="workout in workouts" :key="workout.id">
          <div>
            <strong>{{workout.title}}</strong>
            <p>{{workout.exercise_type || 'General'}} · {{workout.duration}} mins · {{workout.calories}} cal</p>
            <small>{{String(workout.workout_date).split('T')[0]}} {{workout.notes ? '— ' + workout.notes : ''}}</small>
          </div>
          <div class="actions">
            <button @click="editWorkout(workout)">Edit</button>
            <button class="danger" @click="deleteWorkout(workout.id)">Delete</button>
          </div>
        </div>
      </section>
    </main>
  `
};
