import React from 'react';
import { Link } from 'react-router-dom';

export default class RegistArt extends React.Component{
  constructor(props){
    super(props);
    this.state={
      name:"",
      description:""

    }
  }
  render(){
    return (
      <div className="container-fluid">
        <center><h2>Register Art Piece</h2></center>
        <div className="row">
          <div className="well col-md-6 col-md-push-3">
            <div className="form-group">
              <label class="control-label col-sm-1">Name</label>
              <div className="col-sm-4 col-sm-push-7">
                <input className="form-control"onChange={this.changeArtName} value={this.state.name}/>
              </div>
            </div>


          </div>

        </div>

      </div>
    )
  }
}
