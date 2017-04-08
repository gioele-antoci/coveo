import * as React from 'react';

import { drinkType } from './interfaces';
import "./css/DrinkType.css";

export default class DrinkType extends React.Component<
    { active?: drinkType, onChoice: (choice: drinkType) => void },
    { active?: drinkType }> {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    _onChoice(choice: drinkType): void {
        this.setState({ active: choice });
        this.props.onChoice(choice);
    }

    render() {
        return <div className="DrinkType">
            <div className={`wine-choice ${this.state.active === drinkType.wine ? "selected" : ""}`} onClick={() => this._onChoice(drinkType.wine)}>
                Wine
            </div>
            <div className={`beer-choice ${this.state.active === drinkType.beer ? "selected" : ""}`} onClick={() => this._onChoice(drinkType.beer)}>
                Beer
            </div>
            <div className={`others-choice ${this.state.active === drinkType.others ? "selected" : ""}`} onClick={() => this._onChoice(drinkType.others)}>
                Others
            </div>

        </div>
    }
}