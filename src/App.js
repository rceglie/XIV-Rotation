import './style/App.css';
import './scripts/source.js';
import { rawHTML } from './html.js';
import { Parser } from 'html-to-react'

function App() {
  return (
    <div className="App">
       {Parser().parse(rawHTML)}
    </div>
    
  );
}

export default App;