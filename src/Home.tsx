import * as React from 'react';

import "./css/Home.css";

export default class Home extends React.Component<{ onStart: () => void }, any> {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return <div className="Home">
            <button className={`btn btn-large start-button`} onClick={() => this.props.onStart()}>Start</button>
        </div>
    }
}