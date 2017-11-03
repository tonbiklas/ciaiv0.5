import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown'
import $	from 'jquery';
import DatePicker from 'react-date-picker';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


export default class RegistArt extends React.Component{
  
  constructor(props){
    super(props);
    this.state={
	  author: this.props.author,
      name:"",
      description:"",
	  artMultimedia: [],
	  date: new Date(),
	  keywords: [],
	  price: "",
	  availableToSell: "",
	  currentKeyword:"",
	  currentURL:"",
	  isShowingDate:false}
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
	  return <div className="keywordList">
	  <ol>
	  {this.state.keywords.map((keyword) =>
	  (
	  <li> {keyword} </li>
	  ))}
	  </ol>
	  </div>
  }
  
  render(){
    return (
      <div className="container-fluid">
        <center><h2>Register Art Piece</h2></center>
        <div className="row">
          <div className="well col-md-6 col-md-push-3">
            <form>
			<div className="form-group">
              <label className="control-label col-sm-1">Name</label>
              
             <input className="form-control"onChange={this.changeArtName} value={this.state.name}/>
              
			  <label className="control-label col-sm-1">Description</label>
			  <input className="form-control" onChange={this.changeArtDescription} value={this.state.description}/>
			  
			  <label className="control-label col-sm-1">Price</label>
			  <input className="form-control" onChange={this.changeArtPrice} value={this.state.price}/>
			  
			  <label className="control-label col-sm-6">Creation Date</label>
			  <div id="datepicker">
			  <DatePicker className="col-sm-6" calendarType="ISO 8601" onChange={this.changeDate} value={this.state.date} />
			  </div>
			  
			  
			  <label className="control-label col-sm-6">Insert New Keyword</label>
			  <input className="form-control" type="text" onChange={this.changeKeywords} value={this.state.currentKeyword}/>
			  &nbsp;
			  <button type="button" className="btn btn-primary" onClick={this.insertKeyword}>Insert</button>
             &nbsp;
			 <div id="keywordsHidden" hidden>
			 <p> Keyword List: </p>
             <div> {this.keywordList()} </div>
			 </div>
			 
			 <label className="control-label col-sm-6">Insert new Art Piece </label>
			 <input className="form-control" type="text" onChange={this.changeMultimedia} value={this.state.currentURL}/>
			  
			 <button type="button" className="btn btn-primary" onClick={this.insertMultimedia}>Insert</button>
			  
			 <div id="artPieces" hidden>
			 <p> Art Pieces added:</p>
			 <div> {this.multimediaURLList()} </div>
			 </div>
			  
			  <Dropdown className="dropdown" options={[
             {value: 'one', label: 'Yes'},
             {value: 'two', label: 'No'}
             ]} value={this.availableToSell} placeholder="Is it avilable to sell?"/>
	  
            </div>
            </form>

          </div>

        </div>

      </div>
    )
  }
}
