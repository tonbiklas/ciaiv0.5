import React from 'react';
import { Link } from 'react-router-dom';
import Sound from 'react-sound';
import $	from 'jquery';


export default class ArtistGallery extends React.Component{
  
  constructor(props){
    super(props);
    this.state={
		author: "Catela",
		artPieces: [],
	}
	this.multimediaList = this.multimediaList.bind(this);
	this.renderMultimedia = this.renderMultimedia.bind(this);
	this.checkAvailability = this.checkAvailability.bind(this);
  }
  
  checkAvailability( available){
	  if(available.toUpperCase().localeCompare("YES") === 0){
		  $("#price").show();
	  }
	  }
  
  multimediaList(url){
	if(url.split(".").pop() === "jpg")
	  {
		  return(
		  <img src= './images/foto-da-capa.jpg' alt=""/>)  
	  }
      if(url.split(".").pop() === "mp3"){
			   return(
			   <Sound
                url="cool_sound.mp3"
                playStatus={Sound.status.STOPPED}
                onFinishedPlaying={this.handleSongFinishedPlaying}/>)
		  }
	  if(url.split(".").pop() === "mp4"){
		  return(
			   <video loop="" autoplay="" muted="">
               <source src={url}/>
               </video>)
		  }
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
        <center><h2> {this.state.author} Gallery </h2></center>
		<div className="artPieces">
		{this.state.artPieces.map((piece) =>
		(
		<center><h3>{piece.name}</h3></center>,
		piece.artMultimedia.map((url) =>
		(
		<div> className="multimedia"> {this.renderMultimedia()} 
		<label> className="control-label col-sm-6">Available To Sell:</label>
		<p> {piece.availableToSell}</p>	
		<div id="price" hidden>
		<div>{this.checkAvailability(piece.availableToSell)} </div>
		<label> className="control-label col-sm-6">Price:</label>
		<p> {piece.price}</p>
		</div>
		</div>
				
		))
		))}
		</div>
		</div>
		)
  }
}