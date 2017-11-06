import React from 'react'
import {Link} from 'react-router-dom'
import Store from './store/Store'
import {Navbar, NavItem, Nav} from 'react-bootstrap'

export default class Albuns extends React.Component{
  constructor(props){
    super(props)
    this.state={
    }
  }
  componentDidUnmount(){
  }
  render(){
    return(
      <div>
      <Navbar staticTop >
        <Navbar.Header>
          <Navbar.Brand>
            Welcome to ArtBook {Store.getLoggedUsername()}
          </Navbar.Brand>
        </Navbar.Header>
            <Nav>
              <NavItem eventKey={1} ><Link to="/">Home</Link></NavItem>
              <NavItem eventKey={2} ><Link to="/albuns">Albuns</Link></NavItem>
              <NavItem disabled={!Store.isArtist() || !Store.isLogged()} eventKey={3}><Link to="/registart">Add ArtPiece</Link></NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1}><Link to="/login">Log In</Link></NavItem>
              <NavItem eventKey={2}><Link to="/signup">Sign Up</Link></NavItem>
            </Nav>
      </Navbar>
      </div>
    )
  }
}
