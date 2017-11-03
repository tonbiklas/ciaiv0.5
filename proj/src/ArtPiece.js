import React from 'react';
import { Link } from 'react-router-dom';
import $	from 'jquery';
import Sound from 'react-sound';

export default class ArtPiece extends React.Component{
  componentDidMount() {
	this.bidAppear();
	}
	
  constructor(props){
    super(props);
    this.state={
		 author: "André Castela",
      name:"João Santos",
      description:"This is the description of this art piece",
	  artMultimedia: ["/images/foto-da-capa.jpg"],
	  date: new Date(),
	  keywords: ["p", "r"],
	  price: 1,
	  availableToSell: "yes",
	  owner:"",
	  bid:""
	}
	this.keywordList = this.keywordList.bind(this);
	this.renderMultimedia = this.renderMultimedia.bind(this);
	this.multimediaList = this.multimediaList.bind(this);
	this.changeBid = this.changeBid.bind(this);
	this.submitBid = this.submitBid.bind(this);
	this.bidAppear = this.bidAppear.bind(this);
}

bidAppear(){
	  if(this.state.availableToSell.toUpperCase().localeCompare("YES") == 0){
		  $("#bids").show();
	  }
}

submitBid(e){
	if(this.state.price !== "")
	{
		if(parseInt(this.state.bid) < parseInt(this.state.price)){
		alert("Bid value must be equal or higher than the defined price!")
		this.setState({bid: ""})
	}
	else{
		this.setState({bid: e.target.value})
		alert("A message was sent to the owner of the art piece.")
	}
	}
}

changeBid(e){
	this.setState({bid: e.target.value})
}

keywordList(){
	  var counter = 0;
	  return <div className="keywordList">
	  <p> &emsp; </p>
	  <ol>
	  {this.state.keywords.map((keyword) =>
	  (
	  <li key={counter++}> {keyword} </li>
	  ))}
	  </ol>
	  </div>
  }
  
 multimediaList(url){
	return
	<div>
	   if(url.split(".").pop() === "jpg")
	  {
		  <img src="C:\Users\Ricardo\Desktop\ciaiv0.5\proj\src\images\foto-da-capa.jpg" alt="image not found"/>  
	  }
      if(url.split(".").pop() === "mp3"){
			   <Sound
                url="cool_sound.mp3"
                playStatus={Sound.status.STOPPED}
                onFinishedPlaying={this.handleSongFinishedPlaying}/>
		  }
	  if(url.split(".").pop() === "mp4"){
			   <video loop="" autoplay="" muted="">
               <source src={url}/>
               </video>
		  }
		  </div>
 } 
  
  renderMultimedia(){
var counter = 0;	 
	 return <div className="multimediaList">
	  {this.state.artMultimedia.map((url) =>
	  (
	  <li key={counter++}>{this.multimediaList(url)} </li>
	  ))}  
	  </div>
  }


render(){
    return (
	 <div className="container-fluid">
        <center><h2>{this.state.name}</h2></center>
        <div className="row">
          <div className="well col-md-6 col-md-push-3">
		  
          <div className="multimedia"> {this.renderMultimedia()} </div>		  

		  <label className="control-label col-sm-1">Author:</label>
		   <p> &emsp;{this.state.author}</p>
		  
		   <label className="control-label col-sm-1">Description:</label>
		   <p> &emsp; &emsp; &emsp;{this.state.description} </p>
		   
		    <label className="control-label col-sm-6">Creation Date:</label>
			<p> 1 </p>
		   
		     <label className="control-label col-sm-6">Available To Sell:</label>
			 <p> {this.state.availableToSell}</p>
			
			<label className="control-label col-sm-1">Price:</label>
			<p> {this.state.price}</p>
			
			<div id="bids" hidden>
			<input type="text" className="form-control" type="number"  onChange={this.changeBid} value={this.state.bid}/>
			 <button type="button" className="btn btn-primary" onClick={this.submitBid}>Make Bid</button>
			</div>
			 <label className="control-label col-sm-1">Owner:</label>
			 <p> &emsp; i{this.state.owner}</p>
			
			<label className="control-label col-sm-1">Keywords:</label>
			<div>{this.keywordList()}</div>
		  
		  </div>
		  </div>
		  </div>
	)
}

}