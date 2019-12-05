import React from 'react';
import './App.css';
import Home from "./Home";
import SignIn from "./components/SignIn";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import ChooseService from "./components/ChooseService";

function App() {
  return (
      <Router>
        <Switch>
            <Route path="/dashboard">
                <Dashboard />
            </Route>
            <Route path="/services">
                <ChooseService/>
            </Route>
            <Route path="/forgetpassword">
                <div>Fuck you</div>
            </Route>
            <Route path="/signup">
                <SignUp />
            </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
