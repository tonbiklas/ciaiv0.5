import React from 'react';
import { Link } from 'react-router-dom';
import $	from 'jquery';
import Sound from 'react-sound';
import Store from './store/Store';
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import Dispatcher from './dispatcher.js';

export default class ArtPiece extends React.Component{
  componentDidMount() {
    this.bidAppear();
  }
  constructor(props){
    super(props);
    this.state={
      logged:Store.getUserLogged(),
      isLogged:Store.isLogged(),
      author: this.props.match.params.author,
      name:   this.props.match.params.piecename,
      piece: Store.getArtPiece(this.props.match.params.author, this.props.match.params.piecename),
      owner:"",
      bid:"",
    }
    this.keywordList = this.keywordList.bind(this);
    this.renderMultimedia = this.renderMultimedia.bind(this);
    this.multimediaList = this.multimediaList.bind(this);
    this.changeBid = this.changeBid.bind(this);
    this.submitBid = this.submitBid.bind(this);
    this.bidAppear = this.bidAppear.bind(this);
    this.logout= this.logout.bind(this);
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

  bidAppear(){
    if(this.state.piece.availableToSell.toUpperCase().localeCompare("YES") === 0 && this.state.isLogged === true){
      $("#bids").show();
    }
  }

  submitBid(e){
    if(this.state.piece.price !== ""){
      if(parseInt(this.state.bid) < parseInt(this.state.piece.price)){
        alert("Bid value must be equal or higher than the defined price!")
        this.setState({bid: ""})
      }
      else{
        this.setState({bid: e.target.value})
        Store.makeBid(this.state.bid, this.state.logged.username, this.state.author, this.state.name)
        alert("A message was sent to the owner of the art piece.")
      }
    }
  }
  changeBid(e){
    this.setState({bid: e.target.value})
  }
  keywordList(){
    var counter = 0;
    return(
      <div className="keywordList">
      <ol>
      {this.state.piece.keywords.map((keyword) =>
        (
          <li key={counter++}> <Link to={"/listkeyword/" + keyword}> {keyword}</Link> </li>
        ))}
        </ol>
        </div>
      )
    }
    multimediaList(artURL){
      if(artURL.split(".").pop() === "jpg")
      {
        return(
          <img src = {artURL} alt=""/>)
        }
        if(artURL.split(".").pop() === "mp3"){
          return(
            <Sound
            url = {artURL}
            playStatus={Sound.status.STOPPED}
            onFinishedPlaying={this.handleSongFinishedPlaying}/>)
          }
          if(artURL.split(".").pop() === "mp4"){
            return(
              <video loop="" autoplay="" muted="">
              <source src={artURL} />
              </video>)
            }
          }

          renderMultimedia(){
            var counter = 0;
            return <div className="multimediaList">
            {this.state.piece.artMultimedia.map((url) =>
              (
                <center> <div key={counter++}>{this.multimediaList(url)} </div> </center>
              ))}
              </div>
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
                <NavItem eventKey={2}><Link to={"/artistgallery/" + this.state.author}>Artist Gallery</Link></NavItem>
                <NavItem eventKey={1}><Link to="/login">Log In</Link></NavItem>
                <NavItem disabled={!Store.isLogged()} onClick={this.logout} eventKey={3}><Link to="/login">Log out</Link></NavItem>
                </Nav>
                </Navbar>


                <center><h2>{this.state.piece.name}</h2></center>
                <div className="row">
                <div className="well col-md-6 col-md-push-3">

                <div className="multimedia"> {this.renderMultimedia()} </div>

                <p> <b>Author:</b> {this.state.author}</p>
                <p> <b>Description:</b>{this.state.piece.description} </p>
                <p> <b>Creation Date:</b> {this.state.piece.date.toLocaleString()}</p>
                <p> <b>Available To Sell:</b>{this.state.piece.availableToSell}</p>
                <p> <b> Price:</b>{this.state.piece.price}</p>

                <div className="form-group form-inline" id="bids" hidden>
                <input className="form-control" type="number" min="0"  onChange={this.changeBid} value={this.state.bid}/>
                <button type="button" className="btn btn-primary" onClick={this.submitBid}>Make Bid</button>
                </div>

                <p> <b>Owner</b> {this.state.owner}</p>
                <div><b>Keywords:</b>{this.keywordList()}</div>
                </div>
                </div>
                </div>
              )
            }

          }
