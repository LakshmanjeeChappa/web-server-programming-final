import { store } from "../services/dataService.js"

export default {

computed:{

userActivities(){
return store.activities.filter(a =>
a.userId === store.currentUser.id
)
},

totalWorkouts(){
return this.userActivities.length
},

totalMinutes(){
return this.userActivities.reduce(
(sum,a)=>sum + a.duration,0
)
}

},


template:`

<div class="container">

<div class="card">

<h2>Statistics</h2>

<div class="stats-grid">

<div class="stat-tile">
<div class="stat-number">{{totalWorkouts}}</div>
<div class="stat-label">Total Workouts</div>
</div>

<div class="stat-tile">
<div class="stat-number">{{totalMinutes}}</div>
<div class="stat-label">Total Minutes</div>
</div>

</div>

</div>

</div>

`

}