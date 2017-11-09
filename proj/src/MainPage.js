import React from 'react'
import {Link} from 'react-router-dom'
import Store from './store/Store'
import {Navbar, NavItem, Nav} from 'react-bootstrap'
import Dispatcher from './dispatcher.js'
import Carousel from 'nuka-carousel'


export default class MainPage extends React.Component{
  constructor(props){
    super(props)
    this.state={
     artist:""
    }
this.searchArtist = this.searchArtist.bind(this);
this.logout = this.logout.bind(this);
  }
  componentDidMount(){

  }
  
  logout()
  {
	   Dispatcher.dispatch({tag:"LOG_OUT"})
  }
  
  searchArtist(e){
	  this.setState({artist: e.target.value})
  }
  
 render(){
    return(
      <div className="container-fluid">
      <Navbar staticTop >
        <Navbar.Header>
          <Navbar.Brand>
            ArtBook
          </Navbar.Brand>
        </Navbar.Header>
            <Nav>
              <NavItem eventKey={1}><Link to="/">Home</Link></NavItem>
              <NavItem disabled={!Store.isArtist() || !Store.isLogged()} eventKey={3}><Link to="/registart">Add ArtPiece</Link></NavItem>
              <NavItem eventKey={2} className="form-inline">
                <input className="form-control" type="text" placeholder="Artist name" onChange={this.searchArtist}/><Link to={"/artistgallery/" + this.state.artist}><button>Search Artist</button></Link>
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1}><Link to="/login">Log In</Link></NavItem>
              <NavItem eventKey={2}><Link to="/signup">Sign Up</Link></NavItem>
			  <NavItem disabled={!Store.isLogged()} onClick={this.logout} eventKey={3}><Link to="/login">Log out</Link></NavItem> 
            </Nav>
      </Navbar>
        <div className="col-md-6 col-md-push-3">
          <div className="well">
		  
            <Carousel autoplay>
              <img src="https://oeclipse.files.wordpress.com/2009/01/mantorras2.jpg" alt=""/>
              <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2" alt=""/>
              <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3" alt=""/>
              <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide4" alt=""/>
              <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide5" alt=""/>
              <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide6" alt=""/>
            </Carousel>
          </div>
        </div>
      </div>
    )
  }
}
