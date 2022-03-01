import React, { Component } from 'react';
import JobSelect from './JobSelect'
import GCDArea from './GCDArea';

function btnClick(){
    console.log("job icon clicked");
}

class Content extends Component {

    render() {
 
        return (
            <div className="content">
                <JobSelect />
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