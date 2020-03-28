import React from 'react';

import './App.css';
import './Components/NavBar/NavBar';
import NavBar from './Components/NavBar/NavBar';
import Auth from './Containers/Auth/Auth';

function App() {
  return (
    <div className="App">
      <NavBar/>
       <Auth/>
    </div>
  );
}

export default App;
