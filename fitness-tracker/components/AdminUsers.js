import { store } from "../services/dataService.js"

export default {

data(){
return{
store,
name:"",
username:"",
password:"",
role:"user",
editingId:null
}
},

methods:{

addUser(){

store.users.push({

id:Date.now(),
name:this.name,
username:this.username,
password:this.password,
role:this.role,
friends:[]

})

this.clear()

},

deleteUser(id){

const index = store.users.findIndex(u=>u.id===id)
store.users.splice(index,1)

},

editUser(user){

this.name=user.name
this.username=user.username
this.password=user.password
this.role=user.role

this.editingId=user.id

},

updateUser(){

const user = store.users.find(u=>u.id===this.editingId)

user.name=this.name
user.username=this.username
user.password=this.password
user.role=this.role

this.clear()

},

clear(){

this.name=""
this.username=""
this.password=""
this.role="user"
this.editingId=null

}

},

template:`
<div class="container">
<div>

<h2>User Management</h2>

<ul>

<li v-for="u in store.users">

{{u.name}} ({{u.role}})

<button @click="editUser(u)">Edit</button>

<button @click="deleteUser(u.id)">Delete</button>

</li>

</ul>

<input v-model="name" placeholder="Name">

<input v-model="username" placeholder="Username">

<input v-model="password" placeholder="Password">

<select v-model="role">

<option value="user">User</option>
<option value="admin">Admin</option>

</select>

<button v-if="editingId==null" @click="addUser">Add</button>
<button v-else @click="updateUser">Update</button>

</div>

`

}
