import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-route';

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
      <div>
        <h3>Nome da aplicação</h3>
        <form>
          <input onChange={this.changeUsername} value={this.state.usernameText}/>
          <input onChange={this.changePassword} value={this.state.passwordText}/>
          <button onClick={this.processLogIn}>Log in</button>
        </form>
        <Link to="/forgotpass">Forgot your password? </Link>
      </div>
    )
  }
}
