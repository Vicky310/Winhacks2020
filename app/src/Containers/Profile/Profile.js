import React, { Component } from 'react';
// import NavBar from '../../Components/NavBar/NavBar';
// import Signup from '../Auth/Auth';
import { connect } from 'react-redux';
class Profile extends Component {

    render()
    {
      const details = (
        <div>
          {this.props.fname}
          <br/>
          {this.props.lname}
          <br/>
          {this.props.lat}
          <br/>
          {this.props.long}
          <br/>
        </div>
      );
        return (
            <div>
              <p>You are logged in</p>
                {details}
            </div>
          );
    }

}

const mapStateToProps = (state) => {
  return {
    fname:state.auth.firstName,
    lname:state.auth.lastName,
    lat:state.auth.latitude,
    long:state.auth.longitude

  }
}
export default connect(mapStateToProps)(Profile);