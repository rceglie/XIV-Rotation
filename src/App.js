import './style/App.css';
import './scripts/source.js';
import { rawHTML } from './html.js';
import { Parser } from 'html-to-react'
import Header from './components/Header';
import JobSelect from './components/JobSelect';

function getJobs(){

  var ret = []

  const xivapi_request = "https://xivapi.com/ClassJob?columns=ID,Name,Icon,ClassJobCategory.Name,ClassJobCategory.ID,Role,IsLimitedJob,ItemSoulCrystalTargetID,Abbreviation";

  fetch(xivapi_request).then(response => response.json()).then(function (json) {
    json.Results.forEach((job) => {
      ret.push(job)
      console.log(job.Icon)
    })
  })
  
  return(ret)
}

function App() {

  const jobs = getJobs()


  return (
    <html>
      <div className="App">
        <Header />
        <JobSelect jobs={jobs}/>
      </div>
    </html>
  );
}

export default App;