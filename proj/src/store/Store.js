import { EventEmitter } from 'events';

import Dispatcher from '../dispatcher.js'

class Store extends EventEmitter{
  constructor(){
    super()
    this.state={
      logged:"",
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
      artPieces: [{
	  author: "André",
      name:"João Santos",
      description:"This is the description of this art piece",
	  artMultimedia: ["images/foto-da-capa.jpg", "images/foto-da-capa.jpg"],
	  date: new Date(),
	  keywords: ["p", "r"],
	  price: "10",
		availableToSell: "yes"},
		{
	  author: "tonbiklas",
      name:"João Santos",
      description:"This is the description of this art piece",
	  artMultimedia: ["images/foto-da-capa.jpg", "images/foto-da-capa.jpg"],
	  date: new Date(),
	  keywords: ["p", "r"],
	  price: "20",
		availableToSell: "yes"},
		{
	  author: "André",
      name:"João Santos",
      description:"This is the description of this art piece",
	  artMultimedia: ["images/foto-da-capa.jpg", "images/foto-da-capa.jpg"],
	  date: new Date(),
	  keywords: ["p", "r"],
	  price: "30",
		availableToSell: "yes"}]
    }
  }

  isPieceNameAvailable(pieceName, author){
	  var isAvailable=true;
	  this.state.artPieces.forEach( piece => {
	  if(piece.author === author && piece.name=== pieceName){
		isAvailable=false;
	  }
  })
  return isAvailable;}

  emailExists(email){
	  var exist=false;
	  this.state.users.forEach(user => {
		  if(user.email === email){
			  exist=true;
		  }
	  })
  return exist;}

  getUsers(){
    return this.state.users;
  }
  isArtist(){
    return this.state.logged.userType==="Artist"
  }

  passwordCorrect(username,password){
	  var verified=false;

	  this.state.users.forEach( user => {
      if(username===user.username && password===user.password){
        verified=true;
      }
	  })
  return verified;
  }
  logIn(username,password){
    var logged=false;
	  this.state.users.forEach( user => {
      if(username===user.username && password===user.password){
        this.state.logged = user;
        logged=true;
        this.state.isLogged=logged;
	    }
	  })
    return logged;
    this.emit("change");
  }
  logout(){
	  if(this.state.isLogged === true){
	  this.state.logged = "";
	  this.state.isLogged=false;
	  alert("You have been Logged out.");
	  this.emit("change");
	  }
	  else{
		  alert("You are not logged in!")
	  }
  }

  getUserLogged(){
    return this.state.logged
  }
  getLoggedUsername(){
    return this.state.logged.username
  }

  usernameExists(username){
	  var exist=false;
	  this.state.users.forEach( user => {
      if(username===user.username){
        exist=true;
      }
    })
  return exist;}

 registerUser(username, password, email, type){
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

    this.emit("change");}

  isLogged(){
    return this.state.isLogged;
  }
  registArtpiece(artPiece){
    this.state.artPieces.push(artPiece)
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

  getArtPiece(author, pieceName){
	  var piece = "";
	  this.state.artPieces.forEach(artPiece => {
	  if(artPiece.author === author && artPiece.name === pieceName){
		  piece=artPiece;
	  }
	  })
  return piece;}

  handleAction(action) {
    switch (action.tag) {
      case "GET_USERS":
        this.getUsers();
        break;
      case "LOG_IN":
        return this.logIn(action.username,action.password)
        break;
      case "GET_USER_LOGGED":
        this.getUserLogged();
        break;
      case "GET_LOGGED_USERNAME":
        this.getLoggedUsername();
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
        this.registArtpiece(action.artPiece);
        break;
      case "GET_ART_BY_KEYWORD":
        this.getArtPiecesByKeyword(action.keywords);
        break;
	    case "LOG_OUT":
		    this.logout();
		    break;
		  case "GET_ARTPIECE_PNAME":
		    this.getArtPiece(action.author, action.pieceName);
		    break;
      default:

    }
  }
}

const store = new Store;
Dispatcher.register(store.handleAction.bind(store))

export default store;
