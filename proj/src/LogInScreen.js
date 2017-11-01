import React from 'react';
import {Link} from 'react-router-dom';
import './styling/LogIn.css';

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
  }
  changeUsername(text){
    this.setState({usernameText:text.target.value});
  }
  changePassword(text){
    this.setState({passwordText:text.target.value});
  }
  processLogIn(){

  }
  render(){
    return (
      <div className="page">
        <h3 className="appName">ArtBook</h3>
        <div className="typeform">
          <p>
            <input onChange={this.changeUsername} value={this.state.usernameText} type="text"/>
          </p>
          <p>
            <input onChange={this.changePassword} value={this.state.passwordText}/>
          </p>
          <p>
            <button type="button" className="btn btn-primary" onClick={this.processLogIn}>Log in</button>
          </p>
        </div>
        <p>
          <Link to="/forgotpass">Forgot your password? </Link>
        </p>
        <p>
          <Link to="/signup">New to ArtBook?</Link>
        </p>
      </div>
    )
  }
}
