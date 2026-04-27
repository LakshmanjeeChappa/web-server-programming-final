import { store } from "../services/dataService.js"

export default {

data(){
return{store}
},

methods:{
logout(){
store.currentUser=null
this.$router.push("/")
}
},

template:`

<div>

<nav>

<div class="nav-left">
<strong style="color:white">Fitness Tracker</strong>

<router-link to="/activities">My Activity</router-link>
<router-link to="/stats">Statistics</router-link>
<router-link to="/friends">Friends Activity</router-link>

<router-link v-if="store.currentUser.role==='admin'" to="/admin">
Admin
</router-link>
</div>

<div class="nav-right">
<span>{{store.currentUser.name}}</span>
<button @click="logout">Logout</button>
</div>

</nav>

<div class="container">

<div class="card">

<h2>Welcome {{store.currentUser.name}}</h2>

<p>Track your workouts and monitor your progress.</p>

</div>

</div>

</div>

`

}