import { EventEmitter } from 'events';

import Dispatcher from '../dispatcher.js'
import $ from 'jquery'

class Store extends EventEmitter{
  constructor(){
    super()
    this.state={
      logged:"",
      isLogged:false,
      users:[],
      artPieces: []
    }
  }
  
  sendEmail(username){
	  
	  $.ajax({
          async: true,
          type: 'POST',
          url: "http://localhost:8080/users/forgotPassword/"+username+"/",
          success: function(data) {
		  }
		  })
  }
  
  isUserEmail(username, email){
	  var verify=false;
	   $.ajax({
     async: false,
     type: 'GET',
     url: "http://localhost:8080/users/isuseremail/"+username+"/"+email+"/",
     success: function(data) {
          verify=data;
   }
   })
	  
  return verify;}
  
  isPieceNameAvailable(pieceName, author){
	var isAvailable=true;
	$.ajax({
     async: false,
     type: 'GET',
     url: "http://localhost:8080/artpieces/"+pieceName+"/"+author+"/",
     success: function(data) {
         isAvailable=false;
     }
});
  return isAvailable;}
  
  notiOwner(answer,id, pieceName, author, owner){
  
	  $.ajax({
          async: false,
          type: 'POST',
          url: "http://localhost:8080/notifications/notiowner/"+id+"/"+answer+"/",
          success: function(data) {
			  answer=data;
		  }
		  })
           
		  if(answer === "changeOwner"){
		  $.ajax({
          async: false,
          type: 'POST',
          url: "http://localhost:8080/artpieces/changeOwner/"+pieceName+"/"+author+"/"+owner+"/",
          success: function(data) {
		  }
		  })
			  }
			  else
		  if(answer === "notToSale"){
          $.ajax({
          async: false,
          type: 'POST',
          url: "http://localhost:8080/notifications/notToSale/"+pieceName+"/"+author+"/",
          success: function(data) {
		  }
		  })		  
				  }		  
  }
  
  confirmTrans(id, pieceName, author, owner){
   var answer = "";
	  $.ajax({
          async: false,
          type: 'POST',
          url: "http://localhost:8080/notifications/confirmTrans/"+id+"/",
          success: function(data) {
		  }
		  })
		  
          if(answer === "changeOwner"){
		  $.ajax({
          async: false,
          type: 'POST',
          url: "http://localhost:8080/artpieces/changeOwner/"+pieceName+"/"+author+"/"+owner+"/",
          success: function(data) {
		  }
		  })
			  }
			  else
		  if(answer === "notToSale"){
          $.ajax({
          async: false,
          type: 'POST',
          url: "http://localhost:8080/notifications/notToSale/"+pieceName+"/"+author+"/",
          success: function(data) {
		  }
		  })		  
				  }		 
		  
  }
  
  answerBid(bidTo, bidfrom, answer, id)
  {   
	    $.ajax({
          async: false,
          type: 'POST',
          url: "http://localhost:8080/notifications/answerbid/"+bidTo+"/"+bidfrom+"/"+answer+"/"+id+"/",
          success: function(data) {
		  }
		  })	
  }
  
  makeBid(value, from, bidTo, pieceName){
	  if(from === bidTo){
		  alert("You cannot buy your own piece!")
	  }
	  else{
		  var u ={
			    bidFrom: from,
				bid: value,
				showOwner: "",
				pieceName: pieceName,
				answer: "",
				closedNot:false,
				type:"Bid",
				to: bidTo,
				pieceOwner: bidTo}
		  
		  $.ajax({
          async: false,
          type: 'POST',
          url: "http://localhost:8080/notifications",
	      contentType: 'application/json; charset=utf-8',
	      data: JSON.stringify(u),
          success: function(data) {
			  
		  }
		  })		
	  }
  }
  
  getNotifications(username){
	 var not=[];
	 $.ajax({
     async: false,
     type: 'GET',
     url: "http://localhost:8080/notifications/userNot/"+username+"/",
     success: function(data) {
          not=data;}
   })
   return not;
  }
  
  emailExists(email){
	 var exist=false;
	 $.ajax({
     async: false,
     type: 'GET',
     url: "http://localhost:8080/users/emailExists/"+email+"/",
     success: function(data) {
          exist=true;
   }
   })
  return exist;}
  
getUsers(){
var users="";	 
	 $.ajax({
     async: false,
     type: 'GET',
     url: "http://localhost:8080/users",
     success: function(data) {
          users=data;
   }
   })
    return users;
  }
  
  isArtist(){
    return this.state.logged.userType==="Artist"
  }
  
  passwordCorrect(username,userPassword){
	  var verified=false;
	   $.ajax({
     async: false,
     type: 'GET',
     url: "http://localhost:8080/users/checkPassword/"+username+"/"+userPassword+"/",
     success: function(data) {
          verified=data;
   }
   })
  return verified;}
  
logIn(username,password){
this.state.isLogged=true;
var temp="";
 $.ajax({
     async: false,
     type: 'GET',
     url: "http://localhost:8080/users/"+username+"/",
     success: function(data) {
          temp=data;
   }
   })
   this.state.logged=temp;
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
    return this.state.logged;
  }
  getLoggedUsername(){
    return this.state.logged.username;
  }
  
  usernameExists(username){
	 var exist=false;
	 $.ajax({
     async: false,
     type: 'GET',
     url: "http://localhost:8080/users/"+username+"/",
     success: function(data) {
          exist=true;
   }
   })
  return exist;}
  
 registerUser(username, password, email, type){
      var u = {
        username:username,
        password:password,
        email:email,
        userType:type
      }
   $.ajax({
     async: false,
     type: 'POST',
     url: "http://localhost:8080/users",
	contentType: 'application/json; charset=utf-8',
	data: JSON.stringify(u),
     success: function(data) {
   }
   })
    this.emit("change");}
  
  isLogged(){
    return this.state.isLogged;
  }
  
  registArtpiece(artPiece, pieceName, author){
	  
	   $.ajax({
     async: false,
     type: 'POST',
     url: "http://localhost:8080/artpieces/"+pieceName+"/"+author+"/",
	contentType: 'application/json; charset=utf-8',
	data: JSON.stringify(artPiece),
     success: function(data) {
   }
   })
   
    this.state.artPieces.push(artPiece)
  }
  getArtPiecesByKeyword(keyword){
   var pieces="";
   $.ajax({
     async: false,
     type: 'GET',
     url: "http://localhost:8080/artpieces/keywords/"+keyword+"/",
     success: function(data) {
          pieces = data;
   }
   })
   return pieces;
  }
  getArtPiecesByAuthor(author){
   var pieces="";
   $.ajax({
     async: false,
     type: 'GET',
     url: "http://localhost:8080/artpieces/"+author+"/",
     success: function(data) {
          pieces = data;
   }
   })
   return pieces;
  }
  
  getArtPiece(author, pieceName){
	var piece="";
	$.ajax({
     async: false,
     type: 'GET',
     url: "http://localhost:8080/artpieces/"+pieceName+"/"+author+"/",
     success: function(data) {
          piece= data;
     }
});
return piece;}
  
  handleAction(action) {
    switch (action.tag) {
      case "GET_USERS":
        this.getUsers();
        break;
      case "LOG_IN":
        this.logIn(action.username,action.password)
        break;
      case "GET_USER_LOGGED":
        this.getUserLogged();
        break;
      case "GET_LOGGED_USERNAME":
        this.getLoggedUsername();
        break;
      case "REGISTER_USER":
        this.registerUser(action.username, action.password, action.email, action.type)
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
		case "MAKE_BID":
		this.makeBid(action.value, action.from, action.to, action.makeOwner)
		break;
      default:
    }
  }
}

const store = new Store();
Dispatcher.register(store.handleAction.bind(store))

export default store;
