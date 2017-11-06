import { EventEmitter } from 'events';

import Dispatcher from '../dispatcher.js'

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
          userType:"Artist",
          notifications:[]
        },
        {
          username:"Amida",
          password:"jorjao",
          email:"amida@gmail.com",
          userType:"User",
          notifications:[]
        }
      ],
      artPieces: []
    }
  }
  getUsers(){
    return this.state.users;
  }
  isArtist(){
    return this.state.logged.userType==="Artist"
  }
  logIn(username,password){
    var a=false;
    this.state.users.forEach( user => {
      if(username===user.username && password===user.password){
        a=true
        this.state.logged = user;
        this.state.isLogged=true;
      }
    })
    if(!a)
      alert("username or password incorrect")
    this.emit("change");
  }
  getUserLogged(){
    return this.state.logged
  }
  getLoggedUsername(){
    return this.state.logged.username
  }
  registerUser(username, password, email, type){
    var exist=false;
    this.state.users.forEach( user => {
      if(username===user.username && email===user.email){
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
  registArtpiece(artPiece){
    alert(JSON.stringify(this.state.artPieces))
    this.state.artPieces.push(artPiece)
    alert(JSON.stringify(this.state.artPieces))
  }
  getArtPiecesByKeyword(keyword){
    var a = [];
    this.state.artPieces.forEach(artPiece => {
      artPiece.keywords.forEach(kw => {
        if(keyword===kw)
          a.push(artPiece)
      })
    })
    return a;
  }
  getArtPiecesByAuthor(aut){
    var a = [];
    this.state.artPieces.forEach(artPiece => {
      if(artPiece.author===aut)
        a.push(artPiece)
    })
    return a;
  }
  handleAction(action) {
    switch (action.tag) {
      case "GET_USERS":
        this.getUsers()
        break;
      case "LOG_IN":
        this.logIn(action.username,action.password)
        break;
      case "GET_USER_LOGGED":
        this.getUserLogged()
        break;
      case "GET_LOGGED_USERNAME":
        this.getLoggedUsername()
        break;
      case "REGISTER_USER":
        this.registerUser(action.username, action.password, action.emai, action.type)
        break;
      case "IS_LOGGED":
        this.isLogged();
        break;
      case "IS_ARTIST":
        this.isArtist();
        break;
      case "REGISTER_ARTPIECE":
        this.registArtpiece(action.artPiece)
        break;
      case "GET_ART_BY_KEYWORD":
        this.getArtPiecesByKeyword(action.keywords)
        break;
      default:

    }
  }
}

const store = new Store;
Dispatcher.register(store.handleAction.bind(store))

export default store;
