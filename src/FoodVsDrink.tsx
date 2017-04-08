import * as React from 'react';

import { foodDrinkPriority } from './interfaces';
import "./css/FoodVsDrink.css";

export default class FoodVsDrink extends React.Component<
    { active?: foodDrinkPriority, onChoice: (choice: foodDrinkPriority) => void },
    { active?: foodDrinkPriority }> {

    constructor(props) {
        super(props);
        this.state = { active: this.props.active };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    _onChoice(choice: foodDrinkPriority): void {
        this.setState({ active: choice });
        this.props.onChoice(choice);
    }

    render() {
        return <div className="FoodVsDrink">
            <div className={`drink-choice ${this.state.active === foodDrinkPriority.drink ? "selected" : ""}`} onClick={() => this._onChoice(foodDrinkPriority.drink)}>
                Drink
            </div>
            <div className={`food-choice ${this.state.active === foodDrinkPriority.food ? "selected" : ""}`} onClick={() => this._onChoice(foodDrinkPriority.food)}>
                Food
            </div>
        </div>
    }
}