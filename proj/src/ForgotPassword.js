import React from 'react';
import {Link} from 'react-router-dom';
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import Store from './store/Store';

export default class ForgotPassword extends React.Component{
  constructor(props){
    super(props);
    this.state={
      
	  username:"",
      email:""
    };
    this.changeUsername = this.changeUsername.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.processNewPassword = this.processNewPassword.bind(this);
	this.processNewPassowrd2 = this.processNewPassowrd2.bind(this);
  }
  
  processNewPassowrd2(e){
              if(!Store.isUserEmail(this.state.username, this.state.email))
			  {
				  e.preventDefault()
			  }
	          else if(!Store.usernameExists(this.state.username)){
		              e.preventDefault()
	           }
	           else
		           if(this.state.email === "")
		           {
			        e.preventDefault()
		            }
		            else
                         if(this.state.username === ""){
		                 e.preventDefault()
	                      }
  }
  
  processNewPassword(){
	  if(this.state.username === ""){
		  alert("Please fill the Username field!")
	  }
	  else
		  if(!Store.usernameExists(this.state.username)){
		  alert("Username does not exist!")
	  }
	  else
		  if(this.state.email === "")
		  {
			  alert("Please confirm your Email!")
		  }
		  else
			  if(!Store.isUserEmail(this.state.username, this.state.email))
			  {
				  alert("This Email does not belong to this user!")
			  }
				  else{
				  alert("Your password was sent to your Email!")
				  Store.sendEmail(this.state.username);
				  }
  }
  changeUsername(e){
    this.setState({username:e.target.value})
  }
  changeEmail(e){
    this.setState({email:e.target.value})
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
              <NavItem eventKey={1} ><Link to="/">Home</Link></NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1}><Link to="/login">Log In</Link></NavItem>
            </Nav>
      </Navbar>
	  
	  
        <div className="row">
          <div className="col-md-6 col-md-push-3">
            <h2 align="center">Password Recovery</h2>
            <div className="well">
              <div className="form-group">
                <input className="form-control" placeholder="Username" onChange={this.changeUsername} value={this.state.username} required/>
              </div>
              <div className="form-group">
                <input className="form-control" placeholder="Email" onChange={this.changeEmail} value={this.state.email} required/>
              </div>
            <div className="form-group">
              <center>
                <Link to="/" onClick={this.processNewPassword}><button type="button" className="btn btn-primary" onClick={this.processNewPassowrd2}>Recover Password</button></Link>
              </center>
            </div>

          </div>
          </div>
        </div>
      </div>
    )
  }
}
