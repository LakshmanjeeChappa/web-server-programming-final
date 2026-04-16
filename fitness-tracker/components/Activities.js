import { store } from "../services/dataService.js"

export default {

data(){
return{
store,
type:"",
duration:"",
editingId:null
}
},

computed:{

userActivities(){
return store.activities.filter(a =>
a.userId === store.currentUser.id
)
}

},

methods:{

addActivity(){

store.activities.push({
id:Date.now(),
userId:store.currentUser.id,
type:this.type,
duration:Number(this.duration),
date:new Date().toISOString().split("T")[0]
})

this.type=""
this.duration=""

},

deleteActivity(id){
const index = store.activities.findIndex(a=>a.id===id)
store.activities.splice(index,1)
},

editActivity(activity){
this.type=activity.type
this.duration=activity.duration
this.editingId=activity.id
},

updateActivity(){

const activity = store.activities.find(a=>a.id===this.editingId)

activity.type=this.type
activity.duration=Number(this.duration)

this.type=""
this.duration=""
this.editingId=null

}

},

template:`

<div>

<div class="container">

<div class="card">

<h2>Your Activities</h2>

<ul>

<li v-for="a in userActivities" class="activity-row">

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
}