import React from 'react';
import {Link} from 'react-router-dom';

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
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-md-push-3">
            <center><h1 className="appName">ArtBook</h1></center>
            <div className="imgcontainer">
              <img src="images/foto-da-capa.jpg"/>
            </div>
            <div className="well">
              <div className="form-group">
                <input className="form-control" placeholder="Username" onChange={this.changeUsername} value={this.state.usernameText} required/>
              </div>
              <div className="form-group">
                <input className="form-control" placeholder="Password" onChange={this.changePassword} value={this.state.passwordText} required/>
              </div>
            <div className="form-group">
              <button type="button" className="btn btn-primary form-control" onClick={this.processLogIn}>Log in</button>
            </div>

          </div>
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
