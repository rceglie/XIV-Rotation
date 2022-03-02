import React, { Component, useState } from 'react';
import JobIcon from './JobIcon'


function discordClick(){
    window.open("https://discord.gg/7kMTXJQzQy");
}

class JobSelect extends Component {

    constructor(props) {
        super(props)
        this.state = {
          jobs: [],
          isLoaded: false,
          currentJob: 0
        }
    }

    updateJobSelect(value){
        this.setState({
            currentJob: value
        }, () => {
            this.props.updateContent(this.state.currentJob)
        })
    }

    componentDidMount() {
        const xivapi_request = "https://xivapi.com/ClassJob?columns=ID,Name,Icon,ClassJobCategory.Name,ClassJobCategory.ID,Role,IsLimitedJob,ItemSoulCrystalTargetID,Abbreviation";
        fetch(xivapi_request)
            .then(res => res.json())
            .then(json => {
                var combatjobs = json.Results.slice(18,40);
                combatjobs.splice(17,1) // Removes blue mages
                combatjobs.splice(10,1) // rogue
                combatjobs.splice(7,1)  // arcanist
                this.setState({
                    jobs: combatjobs,
                    isLoaded: true
                }) 
            }) 
    } 

    render() { 

        var { jobs, isLoaded } = this.state

        if(!isLoaded) {

            return <h1>Loading...</h1>

        } else {

            return ( 
                <div className="job-select">
                    {jobs.map((job) => <JobIcon key={job.ID} job={job} updateJobSelect={this.updateJobSelect.bind(this)}/>)}
                </div>
            ) 

        }
    }
}

export default JobSelect;