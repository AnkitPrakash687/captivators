import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import './App.css';
import {grey} from '@material-ui/core/colors'
import ClientDashboard from './component/ClientDashboard'
import AdminDashboard from './component/AdminDashboard'
import AdvisorDashboard from './component/AdvisorDashboard'
import Home from './component/Home'
import FindAdvisorList from './component/client/FindAdvisorList';
import AdvisorDetail from './component/client/AdvisorDetail'
import Payment from './component/client/Payment'
import PrivateRoute from './component/PrivateRoute'
import AboutUs from './component/AboutUs'
function App() {
  return (
    <div style={{background: grey[600]}}>
    <Router>
      <PrivateRoute path="/client" component={ClientDashboard}/>
      <PrivateRoute path="/advisor" component={AdvisorDashboard}/>
      <PrivateRoute path="/admin" component={AdminDashboard}/>
      <PrivateRoute path="/searchResult" component={FindAdvisorList}/>
      <PrivateRoute path="/advisorDetail/:id" component={AdvisorDetail}/>
      <Route exact path="/" component={Home} />
      <Route path="/aboutus" component={AboutUs}/>
    </Router>
    </div>
  );
}

export default App;
