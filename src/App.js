import './style/App.css';
import './scripts/source.js';
import { rawHTML } from './html.js';
import { Parser } from 'html-to-react'
import Header from './components/Header';

function App() {
  return (
    <html>
      <div className="App">
        <Header />
        {Parser().parse(rawHTML)}
      </div>
    </html>
  );
}

export default App;