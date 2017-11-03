import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';
import './App.css';
import LogInScreen from './LogInScreen.js'
import ForgotPass from './ForgotPassword.js'
import SignUpPage from './SignUpPage.js'
import RegistArt from './RegistArt.js'
import MainPage from './MainPage.js'
import Albuns from './Albuns.js'

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/login" component={LogInScreen}/>
          <Route exact path="/forgotpass" component={ForgotPass}/>
          <Route exact path="/signup" component={SignUpPage}/>
          <Route exact path="/registart" component={RegistArt}/>
          <Route exact path="/albuns" component={Albuns}/>
          <Route exact path="/" component={MainPage}/>
        </Switch>
      </main>
    );
  }
}

export default App;
