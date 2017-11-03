import React from 'react'
import {Link} from 'react-router-dom'
import Store from './store/Store'
import {Navbar, NavItem, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

export default class MainPage extends React.Component{
  constructor(props){
    super(props)
    this.state={
      logged:Store.getUserLogged(),
      isLogged:Store.isLogged()
    }

  }
  componentWillUnmount(){
    Store.on("change", () => {
      this.setState({
        logged:Store.getUserLogged(),
        isLogged:Store.isLogged()
      })
    })
  }
  render(){
    return(
      <div>
      <Navbar staticTop >
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Welcome to ArtBook {this.state.logged.username}</a>
          </Navbar.Brand>
        </Navbar.Header>
            <Nav>
              <LinkContainer to="/"><NavItem eventKey={1}>Home</NavItem></LinkContainer>
              <NavItem eventKey={2} ><Link to="/albuns">Albuns</Link></NavItem>
              <NavItem disabled={!this.state.isLogged} eventKey={3} href="/registart">Add ArtPiece</NavItem>
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
