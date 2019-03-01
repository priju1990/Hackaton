import React from "react";
import   '../../scss/styles.css' 

import axios from 'axios'

class FeedbackUnreg extends React.Component {

    constructor(props){
        super(props);
        this.state={feedback:'',errorMsg:'',msg:'',empID:'',eventID:''}
       
        this.ratingSel=this.ratingSel.bind(this)
      
        this.submitVals=this.submitVals.bind(this)
       
    }

  ratingSel(event){
    console.log("comingg",event.target.value)
    this.setState({feedback:event.target.value})
  }
    submitVals(event){
      event.preventDefault();
      
        var data ={ empID:this.state.empID,description:this.state.feedback,eventID:this.state.eventID};
      if(this.state.feedback===''){
        this.setState({errorMsg:"Please select one of the options!!"})

      }
      else{
        this.setState({errorMsg:''})
        axios
        .put(
          "http://localhost:9090/persistFeedback" ,data
         
        )
        .then(response => {
         
          this.setState({msg:"Thanks for providing your feedback!!"})
            console.log(response)
        })
        .catch((err) => {
          console.log("dont knw whats happeningg")
            console.log("AXIOS ERROR: ", err);
          })}

    }
    componentWillMount(){
      let search = window.location.search;
      let params = new URLSearchParams(search);
      let empID = params.get('empID');
      let eventID = params.get('eventID');
      let bu = params.get('bu');
      this.setState({empID:empID, eventID:eventID,bu:bu})
    }

  render() {
    return ( <div className="container">
    <div className="d-flex justify-content-center h-100">
      <div className="deck h-100 w-100">
        <div className="card-header">
          <h2> {this.state.msg}</h2>
          <h3>Feedback</h3>
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
                <div className="row">
                  <div className="col-sm-12 form-group">
                   
                    <p>
                    <label className="radio-inline">
                        <input
                          onClick={this.ratingSel}
                          type="radio"
                          name="experience"
                          id="feedback"
                          value="Unexpected personal commitment"
                        />
                       <span> Unexpected personal commitment</span>
                      </label>
                      
                      </p>
                    <p><label className="radio-inline">
                        <input
                          onClick={this.ratingSel}
                          type="radio"
                          name="experience"
                          id="feedback"
                          value="Unexpected official work"
                        />
                       <span> Unexpected official work</span>
                      </label>

                      </p>
                    <p>
                      <label className="radio-inline">
                        <input
                        onClick={this.ratingSel}
                          type="radio"
                          name="experience"
                          id="feedback"
                          value="Event not what I expected"
                        />
                       <span> Event not what I expected</span>
                      </label>
                      </p>
                    <p>
                        <label className="radio-inline">
                          <input
                          onClick={this.ratingSel}
                            type="radio"
                            name="experience"
                            id="feedback"
                            value="Did not receive further information about event"
                          />
                         <span>Did not receive further information about event</span>
                        </label>
                        </p>
                        <p>
                        <label className="radio-inline">
                        <input
                          onClick={this.ratingSel}
                          type="radio"
                          name="experience"
                          id="feedback"
                          value="Incorrectly registered"
                        />
                        <span>Incorrectly registered </span>
                      </label>
                      </p>
                      <p>
                      <label className="radio-inline">
                        <input
                          onClick={this.ratingSel}
                          type="radio"
                          name="experience"
                          id="feedback"
                          value="Do not wish to disclose"
                        />
                        <span>Do not wish to disclose </span>
                      </label>
                    </p>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-sm-12 form-group">
                    <button
                    onClick={this.submitVals}
                      type="submit"
                      className="btn btn-lg btn-primary btn-block"
                    >
                      Send →
                    </button>
                  </div>
                </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>);
  }
}
export default FeedbackUnreg;
