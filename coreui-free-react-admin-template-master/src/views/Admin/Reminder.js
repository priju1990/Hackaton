import React, { Component } from 'react';
import axios from 'axios'

class Reminders extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      content:" It is observed that you have not recorded your feedback/comments related to the Outreach event.Please click on the link and provide your inputs. Your inputs are vital for improving the Outreach events. Please corporate." };
      this.submit=this.submit.bind(this);
      this.handleChange=this.handleChange.bind(this)
  }

  
  submit(e){
    e.preventDefault();
    axios.get("http://localhost:9090/getDefaulters")
    .then(response=> {
      console.log(response.data)
    })

  }
handleChange(e){
  this.setState({content:e.target.value})
}
  render() {
    return (
      <div className="animated fadeIn">
       <div className="container">
    <div className="d-flex justify-content-center h-100">
      <div className="card h-100 w-100">
        <div className="card-header">
          <h2> {this.state.msg}</h2>
          <h3>Trigger Reminder Mails for the defaulters</h3>
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
                <div className="row">
                  <div className="col-sm-12 form-group">
                    <p> 
                      Content for Reminder Emails
                    </p>
                 <textarea
                 className="form-control"
                 type="textarea"
                 name="content"
                 id="content"
                 onChange={this.handleChange}
                 >
                 It is observed that you have 
                 not recorded your feedback/comments 
                 related to the Outreach event. 
                 Please click on the link and provide your inputs.
                 Your inputs are vital for improving the Outreach events.
                 Please corporate.
                 </textarea>
                  </div>
                </div>
                <input type="submit" onClick={this.submit}/>
                </div>
                </div>
                </div></div>
                
                </div> </div>
                
       </div>
                    );
  }
}

export default Reminders;
