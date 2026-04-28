import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js";
import Workouts from "./components/Workouts.js";
import Goals from "./components/Goals.js";
import ExerciseTypes from "./components/ExerciseTypes.js";
import AdminUsers from "./components/AdminUsers.js";

export const routes = [
  { path: "/", component: Login },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/workouts", component: Workouts, meta: { requiresAuth: true } },
  { path: "/goals", component: Goals, meta: { requiresAuth: true } },
  { path: "/types", component: ExerciseTypes, meta: { requiresAuth: true } },
  { path: "/admin", component: AdminUsers, meta: { requiresAuth: true, adminOnly: true } }
];
