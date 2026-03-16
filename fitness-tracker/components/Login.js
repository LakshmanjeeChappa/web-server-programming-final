import { store } from "../services/dataService.js"

export default {

data(){
return{
username:"",
password:"",
error:""
}
},

methods:{

login(){

const user = store.users.find(u =>
u.username === this.username &&
u.password === this.password
)

if(user){
store.currentUser = user
this.$router.push("/dashboard")
}
else{
this.error="Invalid login"
}

}

},

template:`

<div class="container">

<div class="card">

<h2>Fitness Tracker Login</h2>

<input v-model="username" placeholder="Username">

<input v-model="password" type="password" placeholder="Password">

<button @click="login">Login</button>

<p style="color:red">{{error}}</p>

</div>

</div>

`
}