import React, { Component } from 'react';
import JobIcon from './JobIcon'

function discordClick(){
    window.open("https://discord.gg/7kMTXJQzQy");
}

class JobSelect extends Component {

    constructor(){
        super()
        this.jobs = ["dps", "healer", "tank"]
    }

    render() {
        return (
            <div className="job-select">
                {this.jobs.map((job) => <JobIcon role={job} icon="/cj/1/warrior.png"/>)}
            </div>
        )
    }
}

export default JobSelect;