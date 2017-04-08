import * as React from 'react';

import "./css/Navigator.css";

type propsType = {
    next: boolean,
    previous: boolean,
    onNext: () => void,
    onPrevious: () => void,
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
            <a className={`btn btn-large prev-button ${!this.props.previous ? "hidden" : ""}`} onClick={() => this.props.onPrevious()}>Previous</a>
            <button className={`btn btn-large next-button ${!this.props.next ? "hidden" : ""}`} onClick={() => this.props.onNext()}>Next</button>

            <a className={`btn btn-large reset-button`} onClick={() => this.props.onReset()}>Reset</a>
        </div>
    }
}
