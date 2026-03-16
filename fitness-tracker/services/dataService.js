export const store = {

currentUser:null,

users:[
{ id:1, name:"Admin", username:"admin", password:"123", role:"admin", friends:[2] },
{ id:2, name:"John", username:"john", password:"123", role:"user", friends:[1] },
{ id:3, name:"Sarah", username:"sarah", password:"123", role:"user", friends:[] }
],

activities:[

{ id:1, userId:1, type:"Walking", duration:20 },

{ id:2, userId:2, type:"Running", duration:30 },

{ id:3, userId:2, type:"Cycling", duration:40 },

{ id:4, userId:3, type:"Swimming", duration:25 }

]

}
