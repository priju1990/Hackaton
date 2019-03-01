import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch,BrowserRouter ,HashRouter} from 'react-router-dom';
import { Container } from 'reactstrap';
import ReactDOM from "react-dom";
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
import navigationOther from '../../_navOther'
// routes config
import routes from '../../routes';
import CreateEvent from '../../views/Admin/createEvent'
import CreateRoles from '../../views/Admin/createRoles'
import ViewFeedback from '../../views/Admin/viewFeedback'
import Graph from '../../views/Admin/graph'
import Dashboard from '../../views/Dashboard/Dashboard'
import Login from '../../views/Admin/login'
import Reminders from '../../views/Admin/Reminder'
import App from '../../App'
const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));


class DefaultLayout extends Component {
  constructor(props){
    super(props);
   this.state={nav:'',view:''}
   
  }
componentWillMount(){
  if( sessionStorage.getItem('role')!='Admin'){
    this.setState({nav:navigationOther,view:'/viewFeedback'})}
    else
    this.setState({nav:navigation,view:'/dashboard'})
}
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
   
  }
  changePwd(e){
    this.props.history.push('/changePwd')
  }

  render() {
    
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)} changePwd={e=>this.changePwd(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={this.state.nav} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
          
                <Switch>
               
                 <Route name="Feedback" exact path="/viewFeedback" component={ViewFeedback}/>
                <Route name ="Dashboard"exact path="/dashboard" component={Dashboard} />
                <Route name ="Create Events" exact path="/actions/createEvent" component={CreateEvent} />
                 <Route  name ="Create Roles"exact path="/actions/createRoles" component={CreateRoles} />
                < Route  name ="Reminders"exact path="/reminder" component={Reminders} />
                   <Route  name ="Feedback by BU" exact path="/viewFeedback/bu" render={()=><Graph groupby="bu"/>} />
                   <Route  name ="Feedback by City" exact  path="/viewFeedback/city" render={()=><Graph groupby="city"/>} />
                   <Route  name ="feedback by Country" exact  path="/viewFeedback/country" render={()=><Graph groupby="country"/>} />
                 
                 <Redirect from ="/viewFeedback/country" to ="/viewFeedback/country"/>
                 <Redirect from ="/viewFeedback/city" to ="/viewFeedback/city"/>
                 <Redirect from ="/viewFeedback/bu" to ="/viewFeedback/bu"/>
                 <Redirect from ="/dashboard" to ="/dashboard"/>
                 <Redirect from ="/reminder" to ="/reminder"/>
                 <Redirect from ="/viewFeedback" to ="/viewFeedback"/>
                 <Redirect from ="/actions/createEvent" to ="/actions/createEvent"/>
                 <Redirect from ="/actions/createRoles" to ="/actions/createRoles"/>
                </Switch>
             
              </Suspense>
            </Container>
          </main>
         
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
