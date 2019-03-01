import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios'
import { BrowserRouter } from "react-router-dom";
import App from '../../../App'
import Loadable from 'react-loadable';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Feedback from '../../Admin/viewFeedback'

import  '../../../scss/styles.css';
const isNumber = require('is-number');
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('../../../containers/DefaultLayout'),
  loading
});





class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empID: "",
      password: "",
      errorPassword: "",
      errorEmpID: "",
      EmpIDMsg: ""
    };
    this.setEmpID = this.setEmpID.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.validate = this.validate.bind(this);
  }
  setEmpID(e) {
   

    this.setState({ empID: e.target.value });
  }
  setPassword(e) {
    this.setState({ password: e.target.value });
    console.log(this.state.password);
  }
  validate() {
    if (
      this.state.empID !== "" &&
      this.state.password !== "" &&
      isNumber(this.state.empID) // need to add chk for 6 dig
    ) {
    
      this.setState({ errorEmpID: "" });
      this.setState({ errorPassword: "" });
     

        axios.get("http://localhost:9090/login?empID="+this.state.empID+"&pwd="+this.state.password)
        .then(response=>{
          
            sessionStorage.setItem('role', response.data[0])
            sessionStorage.setItem('empID',this.state.empID);
            this.props.history.push('/dashboard')
           ReactDOM.render( <App />, document.getElementById('home'));;
          }
         
        
         )
        .catch((err)=>console.log(err))
      
    
     
    } else {
      if (this.state.empID === "" || this.state.empID.isNan ) {
        this.setState({ EmpIDMsg: "Enter 6 digit EnpID" });
        this.setState({ errorEmpID: "error" });
      }
      if (this.state.password === "") {
        this.setState({ errorPassword: "error" });
      }
      if (this.state.empID !== "" && this.state.EmpIDMsg === "") {
        this.setState({ errorEmpID: "" });
      }
      if (this.state.password !== "") {
        this.setState({ errorPassword: "" });
      }
    }
  }

 
  render() {
    return (
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3>Sign In</h3>
              <div className="d-flex justify-content-end social_icon" />
            </div>
            <div className="card-body">
              <div>
                <span style={{ color: "red" }}>{this.state.EmpIDMsg}</span>
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-user" />
                  </span>
                </div>
                <input
                  type="text"
                  className={
                    this.state.errorEmpID
                      ? "form-control error"
                      : "form-control"
                  }
                  placeholder="empID"
                  onChange={this.setEmpID}
                />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-key" />
                  </span>
                </div>
                <input
                  type="password"
                  placeholder="password"
                  onChange={this.setPassword}
                  className={
                    this.state.errorPassword
                      ? "form-control error"
                      : "form-control"
                  }
                />
              </div>
              <div className="row align-items-center remember" />
              <div className="form-group">
                <input
                  type="submit"
                  onClick={this.validate}
                  value="Login"
                  className="float-right loginbtn"
                />
              </div>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Don't have an account?<a href="#">Sign Up</a>
              </div>
              <div className="d-flex justify-content-center">
                <a href="#">Forgot your password?</a>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    );
  }
}
export default Login;
