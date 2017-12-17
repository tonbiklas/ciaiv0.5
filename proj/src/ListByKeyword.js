import React from 'react';
import Store from './store/Store';
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Dispatcher from './dispatcher.js';

export default class ListByKeyword extends React.Component{
  constructor(props){
    super(props);
    this.state={
		artPieces: Store.getArtPiecesByKeyword(this.props.match.params.searchkey),
		keyword: this.props.match.params.searchkey
	}
	this.logout = this.logout.bind(this);
  }
  
   logout()
  {
	   Dispatcher.dispatch({tag:"LOG_OUT"})
  }
  
renderPieceImage(piece){ 
	  var pos = 0;	  
  while(piece.artMultimedia.length > pos){
	if(piece.artMultimedia[pos].split(".").pop() === "jpg")
	  {
  return( 
		  <div className="well">
		 <Link to={"/artpiece/" + piece.id.authorName +"/"+ piece.id.pieceName}> <center> <h3>{piece.id.pieceName}</h3> </center></Link>
		  <center> <img src ={piece.artMultimedia[pos]} alt="d"/> </center>
		  <center> <div> <b>Author:</b> {piece.id.authorName} </div> </center>
		  <center> <div> <b>Available to Sell:</b>{piece.availableToSell}</div> </center>
		  </div>
		  )
	  }
	pos++;
  }
return( 
<div className="well">
 <Link to={"/artpiece/" + piece.id.authorName +"/"+ piece.id.pieceName}> <center> <h3>{piece.id.pieceName}</h3> </center></Link>
<center><img src= "/images/default.jpg" alt=""/></center>
 <center> <div> Author: {piece.id.authorName} </div> </center>
 <center><div> Available to Sell:{piece.availableToSell}</div></center>	
		</div>)
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
			  
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1}><Link to="/login">Log In</Link></NavItem>
			  <NavItem disabled={!Store.isLogged()} onClick={this.logout} eventKey={3}><Link to="/login">Log out</Link></NavItem> 
            </Nav>
      </Navbar>
	  
        <center><h2> {this.state.author} Gallery for keyword {this.state.keyword} </h2></center>
		<div className="artPieces">
		{this.state.artPieces.map((piece) =>
		(
		<div className="row">
		<div className="col-md-6 col-md-push-3"> {this.renderPieceImage(piece)} </div>
		 </div>
		))}
		</div>
		</div>
		)
  }
}