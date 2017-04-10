import * as React from 'react';

import "./css/Navigator.css";

type propsType = {
    skip: boolean,
    reset: boolean,
    onSkip: () => void,
    onReset: () => void
};
export default class Navigator extends React.Component<propsType, any> {

    constructor(props: propsType) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return <div className="Navigator">
            <a className={`btn btn-large skip-button ${!this.props.skip ? "hidden" : ""}`} onClick={() => this.props.onSkip()}>skip</a>
            <a className={`btn btn-large reset-button ${!this.props.reset ? "hidden" : ""}`} onClick={() => this.props.onReset()}>Reset</a>
        </div>
    }
}
