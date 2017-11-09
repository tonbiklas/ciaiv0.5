import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';
import './App.css';
import LogInScreen from './LogInScreen.js'
import ForgotPass from './ForgotPassword.js'
import SignUpPage from './SignUpPage.js'
import RegistArt from './RegistArt.js'
import ArtPiece from './ArtPiece.js'
import ArtistGallery from './ArtistGallery.js'
import ListByKeyword from './ListByKeyword.js'
import MainPage from './MainPage.js'

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
		<Route exact path="/" component={MainPage}/>
          <Route exact path="/login" component={LogInScreen}/>
          <Route exact path="/forgotpass" component={ForgotPass}/>
          <Route exact path="/signup" component={SignUpPage}/>
          <Route exact path="/registart" component={RegistArt}/>
		  <Route exact path="/artpiece/:author/:piecename" component={ArtPiece}/>
		  <Route exact path="/artistgallery/:author" component={ArtistGallery}/>
		  <Route name="listkeywords" exact path="/listkeyword/:searchkey" component={ListByKeyword}/>
        </Switch>
      </main>
    );
  }
}

export default App;
