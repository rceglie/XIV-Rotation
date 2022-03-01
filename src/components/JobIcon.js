import React, { Component } from 'react';

function btnClick(){
    console.log("job icon clicked");
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
export default JobIcon;