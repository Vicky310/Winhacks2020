import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import './App.css';
import './Components/NavBar/NavBar';
import NavBar from './Components/NavBar/NavBar';
import Auth from './Containers/Auth/Auth';
import Profile from './Containers/Profile/Profile';
import { connect } from 'react-redux';
import Logout from './Containers/Auth/Logout/Logout';
import Communities from './Containers/Communities/Communities';

class App extends Component {
  render() {
    let routes;
    routes  = (
      <Switch>
        <Route path="/" exact component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
        <Route path="/profile" exact component={Profile} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/communities" exact component={Communities} />
        <Route path="/" exact component={Auth} />
        <Redirect to="/" />
      </Switch>
      );
    }
    return (
      <div className="App">
        {this.props.isAuthenticated ? <NavBar/> : null}
        {routes}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default withRouter(connect(mapStateToProps)(App));
