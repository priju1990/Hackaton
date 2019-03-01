import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.scss';


import * as serviceWorker from './serviceWorker';

import { Redirect, Route, Switch,HashRouter ,BrowserRouter} from 'react-router-dom';
import Login from './views/Pages/Login'
import Feedback1 from './views/Associate/feedback'
import Feedback2 from './views/Associate/feedbackUnreg'
class Home extends React.Component {

render(){
    return(
        <div id="home">
    <BrowserRouter>
    <Switch>
      <Route   path="/login" name="Login Page" component={Login} />
      <Route  path="/feedback1" name="Feedback Page" component={Feedback1} />
      <Route  path="/feedback2" name="Feedback Page" component={Feedback2} />
    
    </Switch>
</BrowserRouter>
</div>
);
}}

ReactDOM.render(<Home />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
