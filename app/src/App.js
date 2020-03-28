import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import './App.css';
import './Components/NavBar/NavBar';
import NavBar from './Components/NavBar/NavBar';
import Auth from './Containers/Auth/Auth';
import Profile from './Containers/Profile/Profile';

class App extends Component {
  render() {
    let routes;
    routes  = (
      <Switch>
        <Route path="/profile" exact component={Profile} />
        <Route path="/" exact component={Auth} />
        <Redirect to="/" />
      </Switch>

    );
    return (
      <div className="App">
        <NavBar/>
        {routes}
      </div>
    );
  }

}

export default App;
