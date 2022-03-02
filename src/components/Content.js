import React, { Component } from 'react';
import JobSelect from './JobSelect'
import GCDArea from './GCDArea';

function btnClick(){
    console.log("job icon clicked");
}

class Content extends Component {

    constructor(props){
        super(props)
        this.state = {
            currentJob: 0
        }
        this.loadJob = this.loadJob.bind(this)
    }  

    jobSelected(value){
        this.setState({
            currentJob: value,
        }, () => {
            //f
        })
    }

    loadJob() {
        console.log(this.state.currentJob)
    }
  
    render() {
 
        return (
            <div className="content">
                <JobSelect updateContent={this.jobSelected.bind(this)}/>
                <div className="rotation-area">
                    <h1>rotation</h1>
                </div>
                <div className="ability-area">
                    <h1>ability description</h1>
                </div>
                <GCDArea />
                <div>
                    <h1>ogcd</h1>
                </div>
                <div>
                    <h1>role action</h1>
                </div>
                <div>
                    <h1>other</h1>
                </div>
            </div>
        )
    }
}
export default Content;