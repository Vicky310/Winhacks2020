import React, { Component } from 'react';
// import NavBar from '../../Components/NavBar/NavBar';
// import Signup from '../Auth/Auth';
import { connect } from 'react-redux';
import classes from './Profile.module.css'
class Profile extends Component {

  render() {

    return (
      <div> 
        <p>You are logged in</p>
        <span className={classes.Profile}>
          FirstName: {this.props.fname}
        </span>
        <span className={classes.Profile}>
          Last Name: {this.props.lname}
        </span>

        <span className={classes.Profile}>
          Latitude: {this.props.lat}
        </span>
        <span className={classes.Profile}>
          Longitude: {this.props.long}
        </span>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    fname: state.auth.firstName,
    lname: state.auth.lastName,
    lat: state.auth.latitude,
    long: state.auth.longitude

  }
}
export default connect(mapStateToProps)(Profile);