import React from 'react';
import $	from 'jquery';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styling/registArt.css'
import moment from 'moment'
import { Dropdown } from 'reactstrap';
import Store from './store/Store';
import dispatcher from './dispatcher';
import {Navbar, NavItem, Nav} from 'react-bootstrap';

export default class RegistArt extends React.Component{

  constructor(props){
    super(props);
    this.state={
      author: Store.getLoggedUsername(),
      name:"",
      description:"",
      artMultimedia: [],
      date: "",
      keywords: [],
      price: "",
      availableToSell: "",
      currentKeyword:"",
      currentURL:""
    }
    this.changeArtName = this.changeArtName.bind(this);
    this.changeArtDescription = this.changeArtDescription.bind(this);
    this.changeArtPrice = this.changeArtPrice.bind(this);
    this.insertKeyword = this.insertKeyword.bind(this);
    this.changeKeywords = this.changeKeywords.bind(this);
    this.keywordList = this.keywordList.bind(this);
    this.changeMultimedia = this.changeMultimedia.bind(this);
    this.insertMultimedia = this.insertMultimedia.bind(this);
    this.multimediaURLList = this.multimediaURLList.bind(this);
    this.multimediaListAppear = this.multimediaListAppear.bind(this);
    this.keywordListAppear = this.keywordListAppear.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.validateRegist = this.validateRegist.bind(this);
    this.showPrice = this.showPrice.bind(this);
    this.changeAvailability = this.changeAvailability.bind(this);
    this.logout= this.logout.bind(this);
  }

  logout()
  {
    dispatcher.dispatch({tag:"LOG_OUT"})
  }

  changeAvailability(){
    this.setState({availableToSell: $("#selectAvailability option:selected").text()})
  }

  showPrice(){
    if(this.state.availableToSell.toUpperCase().localeCompare("YES") === 0){
      $("#showprice").show();
    }
  }

  validateRegist(){
    if(this.state.name === ""){
      alert("A name for the piece is required!")
    }
    else
    if(this.state.description === ""){
      alert("A description for the piece is required!")
    }
    else
    if(this.state.keywords.length === 0)
    {
      alert("Please insert at least one keyword.")
    }
    else
    if(this.state.artMultimedia.length === 0){
      alert("Please insert at least one Art Piece!")
    }
    else
    if(this.state.date ===""){
      alert("Please specify the creation date for this piece!")
    }
    else
    if(this.state.availableToSell === "" || this.state.availableToSell === "Is it available for sale?"){
      alert("Please indicate if this piece will be available for sale!")
    }
    else
    if(!Store.isPieceNameAvailable(this.state.name, this.state.author)){
      alert("You already have a piece with this name!")
    }
    else{
      alert("This piece has been added to your gallery.")
      dispatcher.dispatch({tag:"REGISTER_ARTPIECE", artPiece: {
        author: this.state.author,
        name:this.state.name,
        description:this.state.description,
        artMultimedia: this.state.artMultimedia,
        date: this.state.date,
        keywords: this.state.keywords,
        price: this.state.price,
        availableToSell: this.state.availableToSell
      }
    }) }

  }

  isItAvailable(e){
    this.setState({availableToSell: e.target.value})
  }

  changeDate = date => this.setState({date: date})

  changeArtName(e){
    this.setState({name:e.target.value});
  }

  changeArtDescription(e){
    this.setState({description:e.target.value});
  }

  changeArtPrice(e){
    this.setState({price: e.target.value});
  }

  changeKeywords(e){
    this.setState({currentKeyword: e.target.value});
  }

  changeMultimedia(e){
    this.setState({currentURL: e.target.value});
  }

  insertKeyword(e){
    this.setState({
      keywords: this.state.keywords.concat([this.state.currentKeyword]),
      currentKeyword: ""
    });
  }

  insertMultimedia(e){
    this.setState({
      artMultimedia: this.state.artMultimedia.concat([this.state.currentURL]),
      currentURL: ""
    });
  }

  multimediaListAppear(){
    if(this.state.artMultimedia.length !== 0){
      $("#artPieces").show();
    }
  }

  keywordListAppear(){
    if(this.state.keywords.length !== 0){
      $("#keywordsHidden").show();
    }
  }

  multimediaURLList(){
    this.multimediaListAppear();
    return <div className="URLList">
    <ol>
    {this.state.artMultimedia.map((thisURL) =>
      (
        <li> {thisURL} </li>
      ))}
      </ol>
      </div>
    }

    keywordList(){
      this.keywordListAppear();
      return(
      <div className="keywordList">
        <ol>
          {this.state.keywords.map((keyword) =>
            (
              <li> {keyword} </li>
            ))}
        </ol>
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
          <NavItem eventKey={1} ><Link to="/">Home</Link></NavItem>
          </Nav>
          <Nav pullRight>
          <NavItem disabled={!Store.isLogged()} onClick={this.logout} eventKey={3}><Link to="/login">Log out</Link></NavItem>
          </Nav>
          </Navbar>

          <center><h2>Register Art Piece</h2></center>

          <div className="row">
          <div className="col-md-6 col-md-push-3">
          <div className="well">
          <form>
          <div className="form-group">

          <div className="form-group">
          <label className="control-label ">Name</label>
          <input className="form-control" placeholder="Name of the art piece" onChange={this.changeArtName} value={this.state.name} required/>
          </div>

          <div className="form-group">
          <label className="control-label">Description</label>
          <input className="form-control" placeholder="Description of the piece" onChange={this.changeArtDescription} value={this.state.description} required/>
          </div>
          {/*Technical Information*/}
          <div className="form-group">
          <label className="control-label">Insert New Keyword</label>
          <div className="form-inline">
          <input className="form-control" type="text" placeholder="A keyword that describes your piece" onChange={this.changeKeywords} value={this.state.currentKeyword}/>
          <button type="button" className="btn btn-primary" onClick={this.insertKeyword}>Insert</button>
          </div>
          <div id="keywordsHidden" hidden>
          <p> Keyword List: </p>
          <div> {this.keywordList()} </div>
          </div>
          </div>

          <div className="form-group">
          <label className="control-label">Insert new Art Piece </label>
          <div className="form-inline">
          <input className="form-control" type="text" placeholder="URL to a multimedia content. Accepted formats: jpg, mp3, mp4" onChange={this.changeMultimedia} value={this.state.currentURL}/>
          <button type="button" className="btn btn-primary" onClick={this.insertMultimedia}>Insert</button>
          </div>
          </div>


          <div id="artPieces" hidden>
          <p> Art Pieces added:</p>
          <div> {this.multimediaURLList()} </div>
          </div>

          <div className="form-group">
          <div id="datepicker" >
          <label className="control-label ">Creation Date</label>
          <DatePicker className="form-control" dateFormat="LLL" placeholderText="Select the creation date  " maxDate={moment()} fixedHeight onChange={this.changeDate} selected={this.state.date} />
          </div>
          </div>
          </div>
          </form>

          <div className="form-group">
          <select id="selectAvailability" className="btn btn-primary dropdown-toggle" onChange={this.changeAvailability}>
          <option value="" selected disabled hidden>Select Availability to sell</option>
          <option  value="Yes">Yes</option>
          <option value="No">No</option>
          </select>
          </div>

          <div className="form-group">
            <label className="control-label">Price</label>
            <div className="form-inline">
              <input className="form-control" type="text" onChange={this.changeArtPrice} value={this.state.price}/>
            </div>
          </div>

          </div>

          
          <button type="button" className="form-control btn btn-primary" onClick={this.validateRegist}>Register</button>
          </div>
          </div>

          </div>
        )
      }
    }
