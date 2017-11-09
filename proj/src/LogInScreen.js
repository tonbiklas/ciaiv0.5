import React from 'react';
import {Link} from 'react-router-dom';
import Store from './store/Store';
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import Dispatcher from './dispatcher.js';

export default class LogInScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      usernameText: "",
      passwordText: "",
      logged:false
    }
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.processLogIn = this.processLogIn.bind(this);
  }

  changeUsername(text){
    this.setState({usernameText:text.target.value});
  }

  changePassword(text){
    this.setState({passwordText:text.target.value});
  }

  processLogIn(e){
  if(this.state.usernameText === ""){
	  alert("Please fill the Username field!")
    e.preventDefault()
  }
  else
	  if(this.state.passwordText === ""){
		  alert("Please fill the Password field!")
      e.preventDefault()
	  }
	  else
		   if(this.state.passwordText === ""){
		     alert("Please fill the Password field!")
         e.preventDefault()
	  }
	  else
		  if(!Store.usernameExists(this.state.usernameText)){
        alert("Username does not exist!")
        e.preventDefault()
      }
	  else if(!Store.passwordCorrect(this.state.usernameText,this.state.passwordText)){
		  alert("Password is not correct!")
      e.preventDefault()
	  }
	  else
      if(!Store.logIn(this.state.usernameText, this.state.passwordText)){
        e.preventDefault()
      }
  }
  processLogIn2(e){
    if(!Dispatcher.dispatch({tag:"IS_LOGGED"}))
      alert("here")
    else{

    }
  }
  render(){
    return (
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
            </Nav>
      </Navbar>

        <div className="row">
          <div className="col-md-6 col-md-push-3">
            <center><h1 className="appName">Wellcome Back!</h1></center>
            <div className="imgcontainer">
              <img src="images/foto-da-capa.jpg" alt=""/>
            </div>
			<form>
            <div className="well">
              <div className="form-group">
                <input className="form-control" placeholder="Username" onChange={this.changeUsername} value={this.state.usernameText} required/>
              </div>
              <div className="form-group">
                <input type="password"className="form-control" placeholder="Password" onChange={this.changePassword} value={this.state.passwordText} required/>
              </div>
            <div className="form-group">
              <Link to="/" onClick={this.processLogIn}>
                <button type="button" className="btn btn-primary form-control">Log in</button>
              </Link>
            </div>
            </div>
     </form>
          <div>
            <div align="center">
              <Link to="/forgotpass">Forgot your password? </Link>
            </div>
            <div align="center">
              <Link to="/signup">New to ArtBook?</Link>
            </div>
           </div>
          </div>
        </div>
      </div>
    )
  }
}
