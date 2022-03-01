import './style/App.css';
//import './scripts/source.js';
import { rawHTML } from './html.js';
import { Parser } from 'html-to-react'
import Header from './components/Header';
import JobSelect from './components/JobSelect';
import JobIcon from './components/JobIcon';
import { useEffect, useState } from 'react';

function App() {

  // const jobss = {}
  // const xivapi_request = "https://xivapi.com/ClassJob?columns=ID,Name,Icon,ClassJobCategory.Name,ClassJobCategory.ID,Role,IsLimitedJob,ItemSoulCrystalTargetID,Abbreviation";
  // fetch(xivapi_request).then(response => response.json()).then(function (json) {
  //   json.Results.forEach((job) => {
  //     jobss[job.ID] = job
  //     //console.log(job)
  //   }) 
  // })
  //console.log(jobs)

  return (
      <div className="App">
        <Header />
        <JobSelect />
      </div>
  );
}

export default App;