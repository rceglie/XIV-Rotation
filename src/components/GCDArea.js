import React, { Component } from 'react';

function btnClick(){
    console.log("job icon clicked");
}

class GCDArea extends Component {

    render() {
 
        return (
            <div className="gcd-area">
                <button>sample gcd</button>
            </div>
        )
    }
}
export default GCDArea;