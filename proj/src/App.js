import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';
import './App.css';
import LogInScreen from './LogInScreen.js'
import ForgotPass from './ForgotPassword.js'
import SignUpPage from './SignUpPage.js'
import RegistArt from './RegistArt.js'

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={LogInScreen}/>
          <Route exact path="/forgotpass" component={ForgotPass}/>
          <Route exact path="/signup" component={SignUpPage}/>
          <Route exact path="/registart" component={RegistArt}/>
        </Switch>
      </main>
    );
  }
}

export default App;
