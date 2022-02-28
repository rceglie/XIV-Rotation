import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <h1>FFXIV Rotation Tool</h1>
                <button id="discord-btn" onclick="discord_btn_click()">Discord</button>
            </div>
        )
    }
}

export default Header;