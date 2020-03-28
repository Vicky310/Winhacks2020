import React from 'react';

import './App.css';
import './Components/NavBar/NavBar';
import NavBar from './Components/NavBar/NavBar';
import Signup from './Containers/Signup/Signup';

function App() {
  return (
    <div className="App">
      <NavBar/>
       <Signup/>
    </div>
  );
}

export default App;
