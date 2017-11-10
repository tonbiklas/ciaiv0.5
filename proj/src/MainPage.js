import React from 'react'
import {Link} from 'react-router-dom'
import Store from './store/Store'
import {Navbar, NavItem, Nav} from 'react-bootstrap'
import Dispatcher from './dispatcher.js'
import Carousel from 'nuka-carousel'
import $ from 'jquery';


export default class MainPage extends React.Component{
  constructor(props){
    super(props)
    this.state={
      artist:""
    }
    this.searchArtist = this.searchArtist.bind(this);
    this.logout = this.logout.bind(this);
  }
  notiOwner(answer,id,user){
    Store.notiOwner(answer,id,user);
  }
  logout()
  {
    Dispatcher.dispatch({tag:"LOG_OUT"})
  }
  confirmTrans(id,user){
    Store.confirmTrans(id, user);
  }

  notificationsAppear(){
    if(Store.isLogged()){
      $("#notifications").show();
    }
  }

  answer(bidTo, bidFrom, response,id){
    alert(response)
    Store.answerBid(bidTo, bidFrom, response, id);
  }
  showBids(){
    var notifications = Store.getNotifications(Store.getLoggedUsername());
    var bids = []
    notifications.map((notif)=> {
      if(!notif.closedNot){
        if(notif.type === "Bid"){
          bids.push(notif)
        }
      }
    })
    //alert(JSON.stringify(bids))
    return bids;
  }
  /*showAnswerBid(){
  var notifications = Store.getNotifications(Store.getLoggedUsername());
  var answerBids = [];
  notifications.map((notif) => {
  if(notif.type === "AnswerBid") {
  if(notif.answer === "yes"){
  answerBids.push(notif)
}
}
})
return answerBids
}
showConfirm(){
var notifications = Store.getNotifications(Store.getLoggedUsername());
var confirmed = [];
notifications.map((notif) => {
if(notif.type === "Confirm"){
confirmed.push(notif);
}
})
return confirmed
}*/
showNotifications(notification){

		 if(!notification.closedNot){
		 if(notification.type === "Bid"){
			 return (<p>The user {notification.bidFrom} made a bid for the piece {notification.pieceName} offering {notification.bid} Euros. Accept? <Link to="/" onClick={ () => {this.answer(Store.getLoggedUsername(),notification.bidfrom,"yes", notification.id)}}>Yes</Link> <Link to="/" onClick={ () => {this.answer(Store.getLoggedUsername(),notification.bidfrom, "no", notification.id)}}>No</Link></p>)
	}
	 else if(notification.type === "AnswerBid")
	 {
		 if(notification.answer === "yes"){
			 return(
			 <p>The Artist {notification.answerFrom} has accepted your offer. Do you wish that your name is displayed as the piece owner? <Link to="/" onClick={ () => {this.notiOwner("yes", notification.id, Store.getLoggedUsername())}}>Yes</Link> <Link to="/" onClick={ () => {this.notiOwner("no", notification.id, Store.getLoggedUsername())}}>No</Link></p>
			 )
		 }
		 else{
		return(
		<p>The Artist {notification.answerFrom} has rejected your offer.</p>)
		 }
	 }
	 else if(notification.type === "Confirm"){
		 return(
		 <p>Please click <Link to="/" onClick={ () => {this.confirmTrans(notification.id, Store.getLoggedUsername())}} >here</Link> when the transaction from {notification.to} for the piece {notification.pieceName} has been confirmed.</p>
	     )
	 }
		 }
  }
  /*for(var i= notifications.length-1; i>=0; i--){
  var notifs = [];
  if(!notifications[i].closedNot){
  if(notifications[i].type === "Bid"){
  var notifs = [];
  return(
  <p>The user {notifications[i].bidFrom} made a bid for the piece {notifications[i].pieceName} offering {notifications[i].bid} Euros. Accept? <Link to="/" onClick={ () => {this.answer(Store.getLoggedUsername(),notifications[i].bidfrom,"yes", notifications[i].id)}}>Yes</Link> <Link to="/" onClick={ () => {this.answer(Store.getLoggedUsername(),notifications[i].bidfrom, "no", notifications[i].id)}}>No</Link></p>
)
}
else if(notifications[i].type === "AnswerBid") {
if(notifications[i].answer === "yes"){

return(
<p>The Artist {notifications[i].answerFrom} has accepted your offer. Do you wish that your name is displayed as the piece owner?
<Link to="/" onClick={ () => {this.notiOwner("yes", notifications[i].id, Store.getLoggedUsername())}}>Yes</Link>
<Link to="/" onClick={ () => {this.notiOwner("no", notifications[i].id, Store.getLoggedUsername())}}>No</Link>
</p>
)
}
else{
return(
<p>The Artist {notifications[i].answerFrom} has rejected your offer.</p>)
}
}
else if(notifications[i].type === "Confirm"){
return(
<p>Please click <Link to="/" onClick={ () => {this.confirmTrans(notifications[i].id, Store.getLoggedUsername())}} >here </Link>
when the transaction from {notifications[i].to} for the piece {notifications[i].pieceName} has been confirmed.
</p>
)
}
}
}*/
searchArtist(e){
  this.setState({artist: e.target.value})
}

render(){
  return(
    <div className="container-fluid">
    <Navbar staticTop >
    <Navbar.Header>
    <Navbar.Brand>
    ArtBook
    </Navbar.Brand>
    </Navbar.Header>
    <Nav>
    <NavItem eventKey={1}><Link to="/">Home</Link></NavItem>
    <NavItem disabled={!Store.isArtist() || !Store.isLogged()} eventKey={3}><Link to="/registart">Add ArtPiece</Link></NavItem>
    <NavItem eventKey={2} className=" col-md-push-5 form-inline">
    <input className="form-control" type="text" placeholder="Artist name" onChange={this.searchArtist}/>
    <Link to={"/artistgallery/" + this.state.artist} className="btn btn-default btn-sm glyphicon glyphicon-search">Search</Link>
    </NavItem>
    </Nav>
    <Nav pullRight>
    <NavItem eventKey={1}><Link to="/login">Log In</Link></NavItem>
    <NavItem eventKey={2}><Link to="/signup">Sign Up</Link></NavItem>
    <NavItem disabled={!Store.isLogged()} onClick={this.logout} eventKey={3}><Link to="/login">Log out</Link></NavItem>
    </Nav>
    </Navbar>
    <div className="col-md-6 col-md-push-3">
    <div className="well">

    <Carousel autoplay>
    <img src="https://userscontent2.emaze.com/images/87d95bca-ba6d-420b-ba11-35cbb0f8ba25/97a4fd48d9f2949f83ab564085e2257b.jpg" alt=""/>
    <img src="https://media-cdn.urbanadventures.com/data/218/tour_928/c-fakepath-destination-main-image-miami.jpg" alt=""/>
    <img src="http://mediad.publicbroadcasting.net/p/michigan/files/styles/x_large/public/201411/DSC_0196.jpg" alt=""/>
    </Carousel>
    </div>

    <div className="well" id="notifications" >
    <center><h2>Notifications</h2></center>
    <div>
    <div>{
				Store.getNotifications(Store.getLoggedUsername()).map( (notification) => (
				<div> {this.showNotifications(notification)}</div>

			))
			}
			</div>
    </div>
    </div>
    </div>
    </div>
  )
}
}
