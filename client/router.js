import Login from "./components/Login.js"
import Dashboard from "./components/Dashboard.js"
import Activities from "./components/Activities.js"
import Friends from "./components/Friends.js"
import Stats from "./components/Stats.js"
import AdminUsers from "./components/AdminUsers.js"

import { store } from "./services/dataService.js"

export const routes = [

{ path:"/", component: Login },

{ path:"/dashboard", component: Dashboard },

{ path:"/activities", component: Activities },

{ path:"/friends", component: Friends },

{ path:"/stats", component: Stats },

{ path:"/admin", component: AdminUsers }

]

export function protectRoute(router){

router.beforeEach((to,from,next)=>{

if(to.path !== "/" && !store.currentUser){

next("/")

}
else{

next()

}

})

}
