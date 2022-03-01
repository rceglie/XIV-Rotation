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
        const xivapi_request = "https://xivapi.com/ClassJob?columns=ID,Name,Icon,ClassJobCategory.Name,ClassJobCategory.ID,Role,IsLimitedJob,ItemSoulCrystalTargetID,Abbreviation";
        fetch(xivapi_request)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    jobs: json.Results,
                    isLoaded: true
                }) 
            }) 
    } 

    render() { 

        var { jobs, isLoaded } = this.state

        if(!isLoaded) {

            return <h1>Loading...</h1>

        } else {
            
            console.log(jobs)
            

            return ( 
                <div className="job-select">
                    {/* {jobs.map((job) => <JobIcon job={job}/>)} */}
                </div>
            ) 

        }
    }
}

export default JobSelect;