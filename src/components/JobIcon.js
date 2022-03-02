import React, { Component } from 'react';

class JobIcon extends Component {

    handleClick() {
        this.props.updateJobSelect(this.props.job.ID)
    }

    render() {
 
        return (
            <div className="job-icon">
                <button
                    className={`job-icon-btn role-${this.props.role}`} 
                    type="radio"
                    className={`job-icon-btn role-${this.props.job.role}`}
                    onClick={() => {this.handleClick()}} 
                    type="radio" 
                    style={{backgroundImage:`url('https://xivapi.com${this.props.job.Icon}')`}}
                ></button>
            </div>
        )
    }
}
export default JobIcon;