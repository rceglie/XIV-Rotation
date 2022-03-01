import React, { Component } from 'react';

function btnClick(){
    console.log("https://discord.gg/7kMTXJQzQy");
}

class JobIcon extends Component {

    render() {

        return (
            <div className="job-icon">
                <button
                    className={`job-icon-btn role-${this.props.role}`}
                    onClick={() => {btnClick()}} 
                    type="radio" 
                    style={{backgroundImage:`url('https://xivapi.com${this.props.icon}')`}}
                    ></button>
            </div>
        )
    }
}

// jobList.forEach(job => {
//     JobSelectBtn.onclick = function() { getJobSkills(job.ID) };
//     JobSelectBtn.style.backgroundImage = `url('https://xivapi.com${job.Icon}')`;
//     document.getElementById("Job-Select").appendChild(JobSelectBtn);
// });

export default JobIcon;