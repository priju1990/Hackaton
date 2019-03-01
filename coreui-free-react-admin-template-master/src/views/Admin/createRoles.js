import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios'

class CreateRoles extends React.Component {
    constructor(props){
        super(props);
        this.state={eventID:'',empid:'',name:'',poc:'',role:'',phoneNum:'',msg:'',hideEventId:{"display":"none"}}
        this.captureNumber=this.captureNumber.bind(this)
        this.captureEventID=this.captureEventID.bind(this)
        this.captureEmpid=this.captureEmpid.bind(this)
        this.captureName=this.captureName.bind(this)
        this.capturePOC=this.capturePOC.bind(this)
        this.selectRole=this.selectRole.bind(this)
        this.submitDetails=this.submitDetails.bind(this)
        this.upload=this.upload.bind(this)

    }
    upload(event){
      event.preventDefault();
      axios.get("http://localhost:9090/loadRoles")
      .then(response => {
        console.log(response)
         this.setState({msg:"Role created!!"})
         
       })
       .catch((err) => {
         console.log("dont knw whats happeningg")
           console.log("AXIOS ERROR: ", err);
         })}
    captureNumber(event){
        this.setState({phoneNum:event.target.value})
    }
    captureEventID(event){
        this.setState({eventID:event.target.value})
      }
      captureEmpid(event){
        this.setState({empid:event.target.value})
      }
      captureName(event){
        this.setState({name:event.target.value})
      }
      capturePOC(event){
        this.setState({poc:event.target.value})
      }
      selectRole(event){

          this.setState({role:event.target.value})
          if(event.target.value==='POC'){
              this.setState({hideEventId:{"display":"block"}})
          }
          else{
            this.setState({hideEventId:{"display":"none"}})
            this.setState({eventID:''})
          }
      }
      submitDetails(event){
        event.preventDefault();
          var data={empID:this.state.empid,name:this.state.name,phoneNum:this.state.phoneNum,eventid:this.state.eventID,role:this.state.role}
          axios.post("http://localhost:9090/createRole",data)
          .then(response => {
            console.log(response)
             this.setState({msg:"Role created!!"})
             
           })
           .catch((err) => {
             console.log("dont knw whats happeningg")
               console.log("AXIOS ERROR: ", err);
             })}
   
      
    
  render() {
    return (
      <div className="d-flex justify-content-center h-100">
        <div className="card h-100 w-100">
          <div className="card-header">
            <h3>Create POC/PMO</h3>
            <h3> {this.state.msg}</h3>
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <p>Provide details</p>
                <form role="form" method="post" id="reused_form">
                  <div className="row">
                    <div className="col-sm-6 form-group">
                      <label>Employee ID</label>
                      <p>
                        <input type="text" name="empid" id="empid" onChange={this.captureEmpid}/>
                      </p>
                    </div>
                    <div className="col-sm-6 form-group">
                      <label>Emp Name</label>
                      <p>
                        <input type="text" name="name" id="name" onChange={this.captureName}/>
                      </p>
                    </div>
                    <div className="col-sm-6 form-group">
                      <label>Phone number</label>
                      <p>
                        <input type="text" name="phone" id="phone" onChange={this.captureNumber}/>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 form-group">
                    <label>Select role</label>
                    <label className="radio-inline">
                        <input
                          onClick={this.selectRole}
                          type="radio"
                          name="role"
                          id="role"
                          value="PMO"
                        />
                       <span>PMO</span>
                      </label>
                      
                     
                    <label className="radio-inline">
                        <input
                          onClick={this.selectRole}
                          type="radio"
                          name="role"
                          id="role"
                          value="POC"
                        />
                       <span>POC</span>
                      </label>

                   
                    </div>
                  </div>
                  <div className="row" style={this.state.hideEventId}>
                    <div className="col-sm-12 form-group">
                        <div >
                      <label for="comments">Event ID</label>
                      <input type="text" name="eventid" id="eventid" onChange={this.captureEventID} />
                      </div>
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
                        Mass Load →
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
export default CreateRoles;
