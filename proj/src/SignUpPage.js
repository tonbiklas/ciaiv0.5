import React from 'react';
import {Link} from 'react-router-dom';

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
      <div className="container-fluid">
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
                  <input className="form-control"onChange={this.changePasswordText} value={this.state.passwordText}/>
                </div>
              </div>
              <div className="form-group">
                <label class="control-label col-sm-3">Confirm Password</label>
                <div className="col-sm-6">
                  <input className="form-control"onChange={this.changePasswordConfirm} value={this.state.passwordConfirm}/>
                </div>
              </div>
              <div className="form-group">
                <label class="control-label col-sm-3">E-mail</label>
                <div className="col-sm-6">
                  <input className="form-control"onChange={this.changeEmail} value={this.state.emailText}/>
                </div>
              </div>
            </form>
            <div class="dropdown">
              <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">User Type
              <span class="caret"></span></button>
              <ul class="dropdown-menu">
                <li value="Artist">Artist</li>
                <li value="Normal User">Normal User</li>
              </ul>
            </div>
          </div>
          <div className="form-group">
            <Link to="/">
            <button type="button" className="btn btn-primary form-control" onClick={this.processSigningUp}>Sign up</button>
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
