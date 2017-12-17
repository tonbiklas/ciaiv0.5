import React from 'react';
import { Link } from 'react-router-dom';
import Store from './store/Store';
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import Dispatcher from './dispatcher.js';


export default class ArtistGallery extends React.Component{
  constructor(props){
    super(props);
    this.state={
		author: this.props.match.params.author,
		logged:Store.getUserLogged(),
      isLogged:Store.isLogged(),
		artPieces: Store.getArtPiecesByAuthor(this.props.match.params.author),
		artist:""
	}
	this.renderPieceImage = this.renderPieceImage.bind(this);
	this.logout= this.logout.bind(this);
	this.searchArtist = this.searchArtist.bind(this);
  }
  
  componentWillUnmount(){
    Store.on("change", () => {
      this.setState({
        logged:Store.getUserLogged(),
        isLogged:Store.isLogged()
      })
    })
  }
  
   logout()
  {
	   Dispatcher.dispatch({tag:"LOG_OUT"})
  }
  
   searchArtist(e){
	  this.setState({artist: e.target.value})
  }
	  
renderPieceImage(piece){
var pos = 0;	 
while(piece.artMultimedia.length > pos){
	if(piece.id.authorName.localeCompare(this.state.author) === 0){
	if(piece.artMultimedia[pos].split(".").pop() === "jpg")
	  { 
          return(
		  <div className="well">
		 <Link to={"/artpiece/" + this.state.author +"/"+ piece.id.pieceName}> <center><h3> {piece.id.pieceName}</h3></center> </Link>
		 <center> <img src= {piece.artMultimedia[pos]} alt=""/> </center>
		<center><div> Available to Sell:{piece.availableToSell}</div></center>	
		  </div>
		  )
	}
	}
	pos++;}
	
	return( 
<div className="well">
<Link to={"/artpiece/" + this.state.author +"/"+ piece.id.pieceName}> <center><h3> {piece.id.pieceName}</h3></center> </Link>
<center><img src= 'https://image.freepik.com/icones-gratis/ponto-de-interrogacao_318-52837.jpg' alt="d"/></center>
 <center><div> Available to Sell:{piece.availableToSell}</div></center>
</div>
)


}

  render(){
	  return (
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
			  
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1}><Link to="/login">Log In</Link></NavItem>
			  <NavItem disabled={!Store.isLogged()} onClick={this.logout} eventKey={3}><Link to="/login">Log out</Link></NavItem> 
            </Nav>
      </Navbar>
	 
        <center><h2> {this.state.author} Gallery </h2></center>
		<div className="artPieces">
		{this.state.artPieces.map((piece) =>
		(
		<div> {this.renderPieceImage(piece)} </div>
		))}
		</div>
		</div>
		)
  }
}