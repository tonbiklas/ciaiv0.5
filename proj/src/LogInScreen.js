import React from 'react';
import {Link} from 'react-router-dom';
import Store from './store/Store'
import {Navbar, NavItem, Nav} from 'react-bootstrap'
import Dispatcher from './dispatcher.js'

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
    Dispatcher.dispatch({tag:"LOG_IN", username:this.state.usernameText, password:this.state.passwordText})
  }
  render(){
    return (
      <div className="container-fluid">
      <Navbar staticTop >
        <Navbar.Header>
          <Navbar.Brand>
            Welcome to ArtBook
          </Navbar.Brand>
        </Navbar.Header>
            <Nav>
              <NavItem eventKey={1} ><Link to="/">Home</Link></NavItem>
              <NavItem eventKey={2} ><Link to="/albuns">Albuns</Link></NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1}><Link to="/login">Log In</Link></NavItem>
              <NavItem eventKey={2}><Link to="/signup">Sign Up</Link></NavItem>
            </Nav>
      </Navbar>

        <div className="row">
          <div className="col-md-6 col-md-push-3">
            <center><h1>Welcome Back!</h1></center>
            <div className="well">
              <div className="form-group">
                <input className="form-control" placeholder="Username" onChange={this.changeUsername} value={this.state.usernameText} required/>
              </div>
              <div className="form-group">
                <input type ="password" className="form-control" placeholder="Password" onChange={this.changePassword} value={this.state.passwordText} required/>
              </div>
            <div className="form-group">
              <Link to="/"><button type="button" className="btn btn-primary form-control" onClick={this.processLogIn}>Log in</button></Link>
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
