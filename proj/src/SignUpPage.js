import React from 'react';
import {Link} from 'react-router-dom';
import './styling/signup.css'

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
  processSigningUp(e){
    if(this.state.passwordConfirm===this.state.passwordText){
      alert("User Registered")
      this.setState({isRegistered:true})
    }
    else{
      alert("You must confirm the password")
    }
  }
  render(){
    return (
      <div>
        <p>
          <h3 className="header">Signing Up</h3>
        </p>
        <p>
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
      </div>
    )
  }
}
