import React, { Component, useState } from 'react';
import JobIcon from './JobIcon'


function discordClick(){
    window.open("https://discord.gg/7kMTXJQzQy");
}

class JobSelect extends Component {

    constructor(props) {
        super(props)
        this.state = {
          data: [],
          isLoaded: false,
        }
    }

    componentDidMount() {
        var joblist = []
        const xivapi_request = "https://xivapi.com/ClassJob?columns=ID,Name,Icon,ClassJobCategory.Name,ClassJobCategory.ID,Role,IsLimitedJob,ItemSoulCrystalTargetID,Abbreviation";
        fetch(xivapi_request)
            .then(res => res.json())
            .then(function (json) {
                json.Results.forEach((job) => {
                    joblist.push(job)
                })
            })
            this.setState({
                isLoaded: true,
                jobs: joblist
            }) 
    } 

    render() { 

        var { isLoaded, jobs } = this.state

        if(!isLoaded) {

            return <h1>Loading...</h1>

        } else {
            
            jobs.forEach((job) =>{
                console.log(job)
            })
            

            return ( 
                <div className="job-select">
                    {/* {jobs.map((job) => <JobIcon job={job}/>)} */}
                </div>
            ) 

        }
    }
}

export default JobSelect;