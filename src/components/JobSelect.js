import React, { Component } from 'react';
import JobIcon from './JobIcon'

function discordClick(){
    window.open("https://discord.gg/7kMTXJQzQy");
}

class JobSelect extends Component {

    render() {
        console.log("rendering")
        return (
            <div className="job-select">
                {this.props.jobs.map((job) => <JobIcon job={job}/>)}
            </div>
        ) 
    }
}

export default JobSelect;