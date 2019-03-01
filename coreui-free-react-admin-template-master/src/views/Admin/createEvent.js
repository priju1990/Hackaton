import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

class CreateEvent extends React.Component {
  constructor(props){
    super(props);
    this.state={id:'',city:'',country:'',month:'',poc:'',name:''}
    this.submitDetails=this.submitDetails.bind(this)
    this.captureEventID=this.captureEventID.bind(this)
    this.captureEventName=this.captureEventName.bind(this)
    this.captureDate=this.captureDate.bind(this)
    this.capturePOC=this.capturePOC.bind(this)
    this.captureCity=this.captureCity.bind(this)
    this.captureCountry=this.captureCountry.bind(this)
    this.upload=this.upload.bind(this)
}
upload(event){
  event.preventDefault();
  axios.get("http://localhost:9090/loadEvents")
  .then(response => {
    console.log(response)
     this.setState({msg:"Role created!!"})
     
   })
   .catch((err) => {
     console.log("dont knw whats happeningg")
       console.log("AXIOS ERROR: ", err);
     })}
submitDetails(event){
  event.preventDefault();
  var data={id:this.state.id,name:this.state.name,city:this.state.city,country:this.state.country,poc:this.state.poc,month:this.state.month}
  axios.post("http://localhost:9090/createEvent",data)
  .then(response => {
    console.log(response)
     this.setState({msg:"Role created!!"})
     
   })
   .catch((err) => {
     console.log("dont knw whats happeningg")
       console.log("AXIOS ERROR: ", err);
     })}

captureEventID(event){
  this.setState({id:event.target.value})
}
captureEventName(event){
  this.setState({name:event.target.value})
}
captureCity(event){
  this.setState({city:event.target.value})
}
captureCountry(event){
  this.setState({country:event.target.value})
}
capturePOC(event){
  this.setState({poc:event.target.value})
}
captureDate(event){
  this.setState({month:event.target.value})
}
  render() {
    return (
      <div className="d-flex justify-content-center h-100">
        <div className="card h-100 w-100">
          <div className="card-header">
            <h3>Create Event</h3>
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <p>Provide details of the event</p>
                <form role="form" method="post" id="reused_form">
                <div className="row">
                    <div className="col-sm-6 form-group">
                      <label>Event ID</label>
                      <p>
                        <input type="text" name="eventid" id="eventid" onChange={this.captureEventID}/>
                      </p>
                    </div>
                    </div>
                  <div className="row">
                    <div className="col-sm-6 form-group">
                      <label>Event Name</label>
                      <p>
                        <input type="text" name="event" id="event" onChange={this.captureEventName}/>
                      </p>
                    </div>
                    <div className="col-sm-6 form-group">
                      <label>City</label>
                      <p>
                        <input type="text" name="city" id="city" onChange={this.captureCity}/>
                      </p>
                    </div>
                    <div className="col-sm-6 form-group">
                      <label>Country</label>
                      <p>
                        <input type="text" name="country" id="country" onChange={this.captureCountry}/>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 form-group">
                      <label>Date and time</label>
                      <p>
                        <input type="text" name="day" id="day"  onChange={this.captureDate}/>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 form-group">
                      <label for="comments">Point of contact</label>
                      <input type="text" name="poc" id="poc"   onChange={this.capturePOC}/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 form-group">
                      <button
                      onClick={this.submitDetails}
                        type="submit"
                        className="btn btn-lg btn-primary btn-block"
                      >
                        Create →
                      </button>
                    </div>
                    <div className="col-sm-12 form-group">
                      <button
                      onClick={this.upload}
                        type="submit"
                        className="btn btn-lg btn-primary btn-block"
                      >
                        Mass Load→
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateEvent;
