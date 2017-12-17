import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import Store from './store/Store';
import dispatcher from './dispatcher.js';

export default class SignUpPage extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      usernameText:"",
      passwordText:"",
      passwordConfirm:"",
      emailText:"",
      typeUser:"",
      isRegistered:false//Vai ajudar para sabermos se vale guardamos estas informações ou não
    }
    this.changeUsername = this.changeUsername.bind(this);
    this.changePasswordText = this.changePasswordText.bind(this);
    this.changePasswordConfirm = this.changePasswordConfirm.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.selectUserType = this.selectUserType.bind(this);
    this.processSigningUp = this.processSigningUp.bind(this);
	this.userTypeChange = this.userTypeChange.bind(this);
	this.processSigningUp2 = this.processSigningUp2.bind(this);
  }
  
  userTypeChange(e){
	  this.setState({typeUser: $("#selectUserType option:selected").text()})
  }
  
  changeUsername(e){
    this.setState({usernameText:e.target.value})
  }
  changeEmail(e){
    this.setState({emailText:e.target.value})
  }
  changePasswordText(e){
    this.setState({passwordText:e.target.value})
  }
  changePasswordConfirm(e){
    this.setState({passwordConfirm:e.target.value})
  }
  selectUserType(e){
    this.setState({typeUser:e.target.value})
  }
  
   processSigningUp2(e){
	  if(this.state.usernameText === "")
	  {
		  e.preventDefault()
	  }
	  else
		  if(this.state.passwordText === "")
		  {
			  e.preventDefault()
		  }
		  else
			  if(this.state.passwordConfirm === "")
			  {
				  e.preventDefault()
			  }
			  else
				  if(this.state.passwordConfirm !==this.state.passwordText)
				  {  
					e.preventDefault()
				  }
			  else
				  if(this.state.emailText === "")
				  {
					  e.preventDefault()
				  }
				  else 
					  if(this.state.typeUser === "" || this.state.typeUser ==="Select User Type")
					  {
						  e.preventDefault()
					  }
					  else
						  if(Store.usernameExists(this.state.usernameText)){
							  e.preventDefault()
						  }				  
					  }
  
  processSigningUp(){
	  if(this.state.usernameText === "")
	  {
		  alert("Please choose a username.")
	  }
	  else
		  if(this.state.passwordText === "")
		  {
			  alert("Please choose a password.")
		  }
		  else
			  if(this.state.passwordConfirm === "")
			  {
				  alert("Please confirm your password.")
			  }
			  else
				  if(this.state.passwordConfirm !==this.state.passwordText)
				  {
					alert("The password confirmation is not correct.")  
				  }
			  else
				  if(this.state.emailText === "")
				  {
					  alert("Please choose an E-mail.")
				  }
				  else 
					  if(this.state.typeUser === "" || this.state.typeUser ==="Select User Type")
					  {
						  alert("Please choose your User Type.")
					  }
					  else
						  if(Store.usernameExists(this.state.usernameText)){
							  alert("Username already exists!")
						  }
						  else
						  {
						  this.setState({isRegistered:true})
                              dispatcher.dispatch({
                              tag:"REGISTER_USER",
                              username: this.state.usernameText,
                              password: this.state.passwordText,
                              email: this.state.emailText,
                              type: this.state.typeUser
                              })
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
              <NavItem eventKey={1}><Link to="/login">Log In</Link></NavItem>
            </Nav>
      </Navbar>
	  
        <div className="col-md-6 col-md-push-3">
          <center><h2>Signing Up</h2></center>
          <div className="well">
            <form className="form-horizontal">
              <div className="form-group">
                <label class="control-label col-sm-3">Usersame</label>
                <div className="col-sm-6">
                  <input className="form-control"onChange={this.changeUsername} value={this.state.usernameText}/>
                </div>
              </div>
              <div className="form-group">
                <label class="control-label col-sm-3">Password</label>
                <div className="col-sm-6">
                  <input type="password"className="form-control"onChange={this.changePasswordText} value={this.state.passwordText}/>
                </div>
              </div>
              <div className="form-group">
                <label class="control-label col-sm-3">Confirm Password</label>
                <div className="col-sm-6">
                  <input type="password"className="form-control"onChange={this.changePasswordConfirm} value={this.state.passwordConfirm}/>
                </div>
              </div>
              <div className="form-group">
                <label class="control-label col-sm-3">E-mail</label>
                <div className="col-sm-6">
                  <input className="form-control"onChange={this.changeEmail} value={this.state.emailText}/>
                </div>
              </div>
            </form>
			
			<center><select className="btn btn-primary dropdown-toggle " id="selectUserType" onChange={this.userTypeChange}>
        <option value="" selected disabled hidden>User type</option>
        <option value="User">User</option>
        <option value="Artist">Artist</option>
			</select></center>
			
          </div>
          <div className="form-group">
		  <Link to="/login" onClick={this.processSigningUp}>
            <button type="button" className="btn btn-primary form-control" onClick={this.processSigningUp2}>Sign up</button>
          </Link>         
		 </div>
        </div>
      </div>

    )
  }
}

/*<p>
  <select value={this.state.userType} onChange={this.selectUserType}>
    <option value='Artist'>Artist</option>
    <option value='Normal User'>Normal User</option>
  </select>
</p>
<span className="paragraph">
  Choose a username
  <input onChange={this.changeUsername} value={this.state.usernameText}/>
</span>
<p>
  Type your e-mail
  <input onChange={this.changeEmail} value={this.state.emailText}/>
</p>
<p>
  Choose a password
  <input onChange={this.changePasswordText} value={this.state.passwordText}/>
</p>
<p>
  Confirm the password
  <input onChange={this.changePasswordConfirm} value={this.state.passwordConfirm}/>
</p>
<button onClick={this.processSigningUp}>Sign Up</button>
</div>*/
