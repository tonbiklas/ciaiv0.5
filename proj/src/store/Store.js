import { EventEmitter } from 'events';

class Store extends EventEmitter{
  constructor(){
    super()
    this.state={
      logged:{},
      isLogged:false,
      users:[
        {
          username:"tonbiklas",
          password:"bicicleta",
          email:"tonbiklas@gmail.com",
          type:"Artist",
          notifications:[]
        },
        {
          username:"Amida",
          password:"jorjao",
          email:"amida@gmail.com",
          type:"User",
          notifications:[]
        }
      ]

    }
  }
  getUsers(){
    return this.state.users;
  }
  logIn(username,password){
    var a=false;
    this.state.users.forEach( user => {
      if(username==user.username && password==user.password){
        a=true;
        this.state.logged=user;
        this.state.isLogged=true;
      }
    })
    this.emit("change");
    return a;
  }
  getUserLogged(){
    return this.state.logged;
  }
  getLoggedUsername(){
    return this.state.logged.username
  }
  registerUser(username, password, email, type){
    var exist=false;
    this.state.users.forEach( user => {
      if(username==user.username && email==user.email){
        exist=true;
      }
    })
    if(!exist){
      var u = {
        username:username,
        password:password,
        email:email,
        type:type,
        notifications:[]
      }
      this.state.users.push(u)
      this.state.logged=u
      this.emit("change")
    }
    this.emit("change");
  }
  isLogged(){
    return this.state.isLogged;
  }
}

const store = new Store;
window.store = store;
export default store;
