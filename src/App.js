import './style/App.css';
import './scripts/source.js';
import { rawHTML } from './html.js';
import { Parser } from 'html-to-react'
import Header from './components/Header';
import JobIcon from './components/JobIcon';

function App() {
  return (
    <html>
      <div className="App">
        <JobIcon role={"tank"} icon={"/cj/1/warrior.png"}/>
        <JobIcon role={"healer"} icon={"/cj/1/scholar.png"}/>
        <JobIcon role={"dps"} icon={"/cj/1/samurai.png"}/>
        <Header />
        {Parser().parse(rawHTML)}
      </div>
    </html>
  );
}

export default App;