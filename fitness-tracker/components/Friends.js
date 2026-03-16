import { store } from "../services/dataService.js"

export default {

data(){
return{store}
},

computed:{

friendActivities(){

return store.activities.filter(a =>
store.currentUser.friends.includes(a.userId)
)

}

},

template:`
<div class="container">
<div>

<h2>Friends Activities</h2>

<ul>

<li v-for="a in friendActivities">

{{a.type}} - {{a.duration}} mins

</li>

</ul>

</div>

`

}
