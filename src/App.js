import './style/App.css';
//import './scripts/source.js';
import { rawHTML } from './html.js';
import { Parser } from 'html-to-react'
import Header from './components/Header';
import JobSelect from './components/JobSelect';
import JobIcon from './components/JobIcon';
import { useEffect, useState } from 'react';

function App() {

  return (
      <div className="App">
        <Header />
        <div className="content">
          <JobSelect />
          <div className="rotation-area">
            <h1>rotation</h1>
          </div>
          <div className="ability-area">
            <div>
              <h1>ability description</h1>
            </div>
            <div>
              <h1>gcd</h1>
            </div>
            <div>
              <h1>ogcd</h1>
            </div>
            <div>
              <h1>role action</h1>
            </div>
            <div>
              <h1>other</h1>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;