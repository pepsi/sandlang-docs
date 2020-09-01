import React from 'react';

export class Section extends React.Component {
    constructor(props){
        super();
        this.props = props
    }
    render() {
        return (<div id={this.props.id}>
            <header>
                {this.props.title}
            </header>
            <div style={{
                "paddingLeft": "24px",
                "borderLeft": "5px solid #61AFEF"
            }}>

                {/* todo add proper container support and side bar like on rust book */}
                {this.props.children}
            </div>
        </div>)
    }
}   