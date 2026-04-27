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

<p style="margin-top:10px; font-size:14px; color:#555;">
Demo Accounts:<br>
Admin → <b>admin</b> / <b>123</b><br>
User → <b>john</b> / <b>123</b>
</p>

</div>

</div>

`
}