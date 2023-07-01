import './App.css';
import UserComponent from './user.js';
import GameComponent from './15game.js';
import React, { useEffect, useState } from 'react';

function App() {
  return (
    <div className="fullscreen">
      <div className="App">
        <nav>
          <a href='https://codeforces.com/profile/rohanbachhav'> Codeforces : rohanbachhav </a>
          <br/>
          <a href='https://www.codechef.com/users/rohanbachhav'> Codechef : rohanbachhav </a>
        </nav>
      </div>

      <div className='user-content'>
        <UserComponent />
        <GameComponent />
        {/* <a href='./game.js'> game </a> */}
      </div>
    </div>
  );
}

export default App;
