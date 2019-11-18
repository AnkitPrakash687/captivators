import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import './App.css';
import {grey} from '@material-ui/core/colors'
import ClientDashboard from './component/ClientDashboard'
import AdminDashboard from './component/AdminDashboard'
import AdvisorDashboard from './component/AdvisorDashboard'
import Home from './component/Home'
function App() {
  return (
    <div style={{background: grey[600]}}>
    <Router>
      <Route path="/client" component={ClientDashboard}/>
      <Route path="/advisor" component={AdvisorDashboard}/>
      <Route path="/admin" component={AdminDashboard}/>
      <Route exact path="/" component={Home} />
    
    </Router>
    </div>
  );
}

export default App;
