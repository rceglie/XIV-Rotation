import React, { Component } from 'react';

function randomClick(){
    console.log("https://discord.gg/7kMTXJQzQy");
}

class JobIcon extends Component {

    render() {
        return (
            <div className="job-icon">
                <h1>FFXIV Rotation Tool</h1>
                <button id="discord-btn" onClick={() => {discordClick()}}>Discord</button>
            </div>
        )
    }
}

export default JobIcon;