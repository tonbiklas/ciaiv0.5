import React from 'react';
import {Link} from 'react-router-dom';
import Store from './store/Store';
import {Navbar, NavItem, Nav} from 'react-bootstrap';

export default class LogInScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      usernameText: "",
      passwordText: "",
    };
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.processLogIn = this.processLogIn.bind(this);
	this.processLogIn1 = this.processLogIn1.bind(this);
  }
  
  changeUsername(text){
    this.setState({usernameText:text.target.value});
  }
  
  changePassword(text){
    this.setState({passwordText:text.target.value});
  }
  
  //para que não haja repeticao de alerts
  processLogIn1(e){
  if(this.state.usernameText === ""){
  e.preventDefault()	
  }
  else
	  if(this.state.passwordText === ""){
		  e.preventDefault()
	  }
	  else
		   if(this.state.passwordText === ""){
		  e.preventDefault()
	  }
	  else
		  if(!Store.usernameExists(this.state.usernameText))
		  {e.preventDefault()}
	  else if(!Store.passwordCorrect(this.state.usernameText,this.state.passwordText)){
		  e.preventDefault()
	  }
	  else
		 this.processLogIn();			  
		  }
  
  
  processLogIn(){
  if(this.state.usernameText === ""){	
	alert("Please fill the Username field!")
  }
  else
	  if(this.state.passwordText === ""){
		  alert("Please fill the Password field!")
	  }
	  else
		   if(this.state.passwordText === ""){
		  alert("Please fill the Password field!")
	  }
	  else
		  if(!Store.usernameExists(this.state.usernameText))
		  {alert("Username does not exist!")}
	  else if(!Store.passwordCorrect(this.state.usernameText,this.state.passwordText)){
		  alert("Password is not correct!")
	  }
	  else
		  if(!Store.logIn(this.state.usernameText, this.state.passwordText)){			  
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
              <button type="button" className="btn btn-primary form-control" onClick={this.processLogIn1}>Log in</button>
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
