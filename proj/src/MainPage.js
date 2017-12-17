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
this.notificationsAppear=this.notificationsAppear.bind(this);
this.showNotifications = this.showNotifications.bind(this);
this.answer=this.answer.bind(this);
this.notiOwner=this.notiOwner.bind(this);
this.confirmTrans = this.confirmTrans.bind(this);
  }
  componentDidMount(){
    this.notificationsAppear();
  }
  
  notiOwner(answer,id,pieceName, author, owner){
	  Store.notiOwner(answer,id,pieceName, author, owner);
  }
  
  
  confirmTrans(id, pieceName, author, owner){
	  Store.confirmTrans(id, pieceName, author, owner);
  }
  
  notificationsAppear(){
      if(Store.isLogged()){	  
	  $("#notifications").show();
	  }
  }
  
  answer(bidTo, bidFrom, response,id){
	  Store.answerBid(bidTo, bidFrom, response, id);
  }
  
  showNotifications(notification){
	  
		 if(!notification.closedNot){
		 if(notification.type === "Bid"){
			 return (<p>The user {notification.bidFrom} made a bid for the piece {notification.pieceName} offering {notification.bid} Euros. Accept? <Link to="/" onClick={ () => {this.answer(Store.getLoggedUsername(),notification.bidFrom,"yes", notification.id)}}>Yes</Link> <Link to="/" onClick={ () => {this.answer(Store.getLoggedUsername(),notification.bidFrom, "no", notification.id)}}>No</Link></p>)
	}
	 else if(notification.type === "AnswerBid")
	 {
		 if(notification.answer === "yes"){
			 return(
			 <p>The Artist {notification.bidFrom} has accepted your offer. Do you wish that your name is displayed as the piece owner? <Link to="/" onClick={ () => {this.notiOwner("yes", notification.id, notification.pieceName, notification.bidFrom, notification.to)}}>Yes</Link> <Link to="/" onClick={ () => {this.notiOwner("no", notification.id,notification.pieceName, notification.bidFrom, notification.to)}}>No</Link></p> 
			 )
		 }
		 else{
		return(
		<p>The Artist {notification.bidFrom} has rejected your offer.</p>)
		 }
	 }
	 else if(notification.type === "Confirm"){
		 return(                                         
		 <p>Please click <Link to="/" onClick={ () => {this.confirmTrans(notification.id, notification.pieceName, notification.to, notification.bidFrom)}} >here</Link> when the transaction from {notification.bidFrom} for the piece {notification.pieceName} has been confirmed.</p>
	     )
	 }
		 }
  }	 
   
  logout()
  {
	   Dispatcher.dispatch({tag:"LOG_OUT"})
  }
  
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
				<Link to={"/artistgallery/" + this.state.artist} className="btn btn-default btn-sm glyphicon glyphicon-search">Search Artist</Link>
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
              <img src="https://artfiles.alphacoders.com/681/68159.jpg" alt=""/>
              <img src="http://mediad.publicbroadcasting.net/p/michigan/files/styles/x_large/public/201411/DSC_0196.jpg" alt=""/>
            </Carousel>
			
			<div className="well" id="notifications" hidden>
			<center><h2>Notifications</h2></center>
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
