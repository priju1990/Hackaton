import React, { Component } from 'react';
import { HashRouter, Route, Switch,BrowserRouter } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});

const ChangePWD = Loadable({
  loader: () => import('./views/Pages/changePWD'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});

class App extends Component {



  render() {
    return (
    
         <BrowserRouter>
          <Switch>
            <Route  path="/changePwd" name="Change Password" component={ChangePWD}/>
            <Route  path="/404" name="Page 404" component={Page404} />
            <Route   path="/500" name="Page 500" component={Page500} />
            <Route   path="/dashboard" name="Home" component={DefaultLayout} />
            <Route   path="/viewFeedback/country" name="Home" component={DefaultLayout} />
            <Route   path="/reminder" name="Home" component={DefaultLayout} />
            <Route   path="/actions/createEvent" name="Home" component={DefaultLayout} />
            <Route   path="/viewFeedback/city" name="Home" component={DefaultLayout} />
            <Route   path="/viewFeedback/bu" name="Home" component={DefaultLayout} />
            <Route   path="/viewFeedback" name="Home" component={DefaultLayout} />
            <Route   path="/actions/createRoles" name="Home" component={DefaultLayout} />
          </Switch>
          </BrowserRouter>
  
    );
  }
}

export default App;
