import React from 'react'
import {Link} from 'react-router-dom'
import Store from './store/Store'
import {Navbar, NavItem, Nav} from 'react-bootstrap'
import dispatcher from './dispatcher.js'
import Carousel from 'nuka-carousel'

export default class MainPage extends React.Component{
  constructor(props){
    super(props)
    this.state={

    }

  }
  componentDidMount(){

  }
  render(){
    return(
      <div className="container-fluid">
      <Navbar staticTop >
        <Navbar.Header>
          <Navbar.Brand>
            Welcome to ArtBook {}
          </Navbar.Brand>
        </Navbar.Header>
            <Nav>
              <NavItem eventKey={1}><Link to="/">Home</Link></NavItem>
              <NavItem eventKey={2} ><Link to="/albuns">Albuns</Link></NavItem>
              <NavItem disabled={!Store.isArtist() || !Store.isLogged()} eventKey={3}><Link to="/registart">Add ArtPiece</Link></NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1}><Link to="/login">Log In</Link></NavItem>
              <NavItem eventKey={2}><Link to="/signup">Sign Up</Link></NavItem>
            </Nav>
      </Navbar>
        <div className="col-md-6 col-md-push-3">
          <div className="well">
            <div className="form-group">
              <label className="control-label col-sm-6">Search by author</label>
              <input className="form-control" type="text"/>

            </div>


            <Carousel autoplay>
              <img src="https://oeclipse.files.wordpress.com/2009/01/mantorras2.jpg"/>
              <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2"/>
              <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3"/>
              <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide4"/>
              <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide5"/>
              <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide6"/>
            </Carousel>
          </div>
        </div>
      </div>
    )
  }
}
