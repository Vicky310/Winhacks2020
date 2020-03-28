import React, { Component } from 'React';
import NavBar from '../../Components/NavBar/NavBar';
import Signup from '../Auth/Auth';

class LandingPage extends Component {
    render()
    {
        return (
            <div>
              <NavBar/>
               <Signup/>
            </div>
          );
    }

}

export default LandingPage;