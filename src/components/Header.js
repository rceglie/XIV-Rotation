import React, { Component } from 'react';

function discordClick(){
    window.open("https://discord.gg/7kMTXJQzQy");
}

class Header extends Component {

    render() {
        return (
            <div className="Header">
                <h1>FFXIV Rotation Tool</h1>
                <button id="discord-btn" onClick={() => {discordClick()}}>Discord</button>
            </div>
        )
    }
}

export default Header;