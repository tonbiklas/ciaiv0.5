import React from 'react';
import {Link} from 'react-router-dom';

export default class ForgotPassword extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email:"",
      confirmEmail:""
    };
    this.changeEmail = this.changeEmail.bind(this);
    this.changeConfirmEmail = this.changeConfirmEmail.bind(this);
    this.processNewPassword = this.processNewPassword.bind(this);
  }
  processNewPassword(){
    if(this.state.email===this.state.confirmEmail)
      alert("A new password was sent to your email")
    else{
      alert("Please confirm your e-mail")
    }
  }
  changeEmail(e){
    this.setState({email:e.target.value})
  }
  changeConfirmEmail(e){
    this.setState({confirmEmail:e.target.value})
  }
  render(){
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-md-push-3">
            <h2 align="center">Password Recovery</h2>
            <div className="well">
              <div className="form-group">
                <input className="form-control" placeholder="Email" onChange={this.changeEmail} value={this.state.email} required/>
              </div>
              <div className="form-group">
                <input className="form-control" placeholder="Confirm Email" onChange={this.changeConfirmEmail} value={this.state.confirmEmail} required/>
              </div>
            <div className="form-group">
              <center>
                <Link to="/"><button type="button" className="btn btn-primary" onClick={this.processNewPassword}>Recover Password</button></Link>
              </center>
            </div>

          </div>
          </div>
        </div>
      </div>
    )
  }
}


/*<div className="page">
  <form className="typeForm">

      <h1>Introduza o seu e-mail</h1>
      <input onChange={this.changeEmail} value={this.state.email}/>

    <p>
      <Link to="/">
        <button onClick={this.processNewPassword}>Recover Password</button>
      </Link>
    </p>
  </form>
</div>*/
