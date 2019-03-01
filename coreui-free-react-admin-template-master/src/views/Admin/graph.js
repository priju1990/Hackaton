import axios from 'axios';
//import React from 'react'
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';

var React = require('react');
var CanvasJSReact = require('./canvasjs.react').default

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends React.Component {
constructor(props){
	super(props);
	this.state={feedback:[]}
	this.getFeedbackByEvent=this.getFeedbackByEvent.bind(this)
	this.drawGraphForEvent=this.drawGraphForEvent.bind(this)

}
	getFeedbackByEvent=(id)=>{
	
		 axios
		 .get(
		   "http://localhost:9090/getFeedbackByEvent?eventID="+id 
		  
		 )
		 .then(response => {
			 
			  this.setState({feedback: response.data })
			
		 })
		 .catch((err) => {
		   console.log("dont knw whats happeningg")
			 console.log("AXIOS ERROR: ", err);
		   })
 

	}
	getFeedbackByBU=()=>{
		
			 axios
			 .get(
			   "http://localhost:9090/getFeedbackByBU" 
			  
			 )
			 .then(response => {
				 
				  this.setState({feedback: response.data })
				
			 })
			 .catch((err) => {
			   console.log("dont knw whats happeningg")
				 console.log("AXIOS ERROR: ", err);
			   })
	 
	
		}
		getFeedbackByCountry=()=>{
			
				 axios
				 .get(
				   "http://localhost:9090/getFeedbackByCountry" 
				  
				 )
				 .then(response => {
					 
					  this.setState({feedback: response.data })
					
				 })
				 .catch((err) => {
				   console.log("dont knw whats happeningg")
					 console.log("AXIOS ERROR: ", err);
				   })
		 
		
			}
		getFeedbackByCity=()=>{
			
				 axios
				 .get(
				   "http://localhost:9090/getFeedbackByCity" 
				  
				 )
				 .then(response => {
					 
					  this.setState({feedback: response.data })
					
				 })
				 .catch((err) => {
				   console.log("dont knw whats happeningg")
					 console.log("AXIOS ERROR: ", err);
				   })
		 
		
			}
			
	drawGraphForEvent(){



		var dps=[];
		for(var j=0;j<this.state.feedback.length; j++){
			dps.push({
				y:this.state.feedback[j][0], label: this.state.feedback[j][1]
				  
						});}
		 this.options = {
			theme: "dark2",
			animationEnabled: true,
			exportFileName: "Feedback Chart",
			exportEnabled: true,
			title:{
				text: "Average feedback by "+this.props.groupby
			},
			data: [{
				type: "pie",
				showInLegend: true,
				legendText: "{label}",
				toolTipContent: "{label}: <strong>{y}</strong>",
				indexLabel: "{y}",
				indexLabelPlacement: "inside",
				dataPoints: dps
				
		}]

	}}
	componentWillReceiveProps(nextProps){
		console.log(this.props.groupby+ "grouped by!!!")
		if(nextProps.groupby){
	if(nextProps.groupby ==='city')
	this.getFeedbackByCity();
	else if(nextProps.groupby ==='bu')
		this.getFeedbackByBU()
		else if(nextProps.groupby ==='country')
		this.getFeedbackByCountry()
		else
		this.getFeedbackByEvent(nextProps.groupby)
}}
componentWillMount(){
	
	if(this.props.groupby ==='city')
	this.getFeedbackByCity();
	else if(this.props.groupby ==='bu')
		this.getFeedbackByBU()
		else if(this.props.groupby ==='country')
		this.getFeedbackByCountry()
		else
		this.getFeedbackByEvent(this.props.groupby)
	
}
	
	render() {

		
		this.drawGraphForEvent()
		
		
		return (
			
		<div>
			<CanvasJSChart options = {this.options}
				/* onRef={ref => this.chart = ref} */
			/>
			
		</div>
		);
	}
}
export default Graph               