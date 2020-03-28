import React from 'react';

import './App.css';
import './Components/NavBar/NavBar';
import { Button } from 'antd';
import NavBar from './Components/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar/>
       <Button type="primary">Testing Button</Button>
    </div>
  );
}

export default App;
