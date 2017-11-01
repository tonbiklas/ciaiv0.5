import React from 'react';
import {Link} from 'react-router-dom';

export default class ForgotPassword extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email:""
    };
    this.changeEmail = this.changeEmail.bind(this);
    this.processNewPassword = this.processNewPassword.bind(this);
  }
  processNewPassword(){
    alert("A new password was sent to your email");
  }
  changeEmail(text){
    this.setState({email:text.target.value})
  }
  render(){
    return(
      <div className="page">
        <form className="typeForm">
          <p>
            <h1>Introduza o seu e-mail</h1>
            <input onChange={this.changeEmail} value={this.state.email}/>
          </p>
          <p>
            <Link to="/">
              <button onClick={this.processNewPassword}>Recover Password</button>
            </Link>
          </p>
        </form>
      </div>
    )
  }
}
