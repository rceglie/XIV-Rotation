import './style/App.css';
//import './scripts/source.js';
import { rawHTML } from './html.js';
import { Parser } from 'html-to-react'
import Header from './components/Header';
import Content from './components/Content';
import { useEffect, useState } from 'react';

function App() {

  return (
      <div className="App">
        <Header />
        <Content />
      </div>
  );
}

export default App;