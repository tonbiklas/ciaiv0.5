import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';
import './App.css';
import LogInScreen from './LogInScreen.js'
import ForgotPass from './ForgotPassword.js'
import SignUpPage from './SignUpPage.js'

/*class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}*/

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={LogInScreen}/>
          <Route exact path="/forgotpass" component={ForgotPass}/>
          <Route exact path="/signup" component={SignUpPage}/>
        </Switch>
      </main>
    );
  }
}

export default App;
