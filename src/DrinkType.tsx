import * as React from 'react';

import { drinkType } from './interfaces';
import queryHelper from './queryHelper';

import "./css/DrinkType.css";

export default class DrinkType extends React.Component<
    { active?: drinkType, onChoice: (choice: drinkType) => void },
    { active?: drinkType }> {

    constructor(props) {
        super(props);
    }

    onChoice(choice: drinkType): void {
        switch (choice) {
            case drinkType.wine:
                queryHelper.addExpression("@tpcategorie", ["vin"], "~=");
                break;

            case drinkType.beer:
                queryHelper.addExpression("@tpcategorie", ["bière"], "~=");
                break;

            case drinkType.whiskey:
                queryHelper.addExpression("@tpcategorie", ["whiskey"], "~=");
                break;

            case drinkType.rhum:
                queryHelper.addExpression("@tpcategorie", ["rhum"], "~=");
                break;

            case drinkType.grappa:
                queryHelper.addExpression("@tpcategorie", ["grappa"], "~=");
                break;

            case drinkType.cidre:
                queryHelper.addExpression("@tpcategorie", ["cidre"], "~=");
                break;

            case drinkType.liqueur:
                queryHelper.addExpression("@tpcategorie", ["cidre"], "~=");
                break;
        }

        queryHelper.search();

        this.setState({ active: choice });
        this.props.onChoice(choice);
    }

    render() {
        return <div className="DrinkType">
            <div className="drinks-container">
                <div className={`wine-choice drink-choice card ${this.state && this.state.active === drinkType.wine ? "selected" : ""}`} onClick={() => this.onChoice(drinkType.wine)}>
                    <img className="drink-img" src="https://www.saq.com/content/dam/saq/section-produits/icn-verres-vin.jpg" />
                    <div className="drink-label">Wine</div>
                </div>
                <div className={`beer-choice drink-choice card ${this.state && this.state.active === drinkType.beer ? "selected" : ""}`} onClick={() => this.onChoice(drinkType.beer)}>
                    <img className="drink-img" src="https://www.saq.com/content/dam/saq/section-produits/icn-verres-biere.jpg" />
                    <div className="drink-label">Beer</div>
                </div>
                <div className={`whiskey-choice drink-choice card ${this.state && this.state.active === drinkType.whiskey ? "selected" : ""}`} onClick={() => this.onChoice(drinkType.whiskey)}>
                    <img className="drink-img" src="https://s7d9.scene7.com/is/image/SAQ/00001487_is" />
                    <div className="drink-label">Whiskey</div>

                </div>
                <div className={`rhum-choice drink-choice card ${this.state && this.state.active === drinkType.rhum ? "selected" : ""}`} onClick={() => this.onChoice(drinkType.rhum)}>
                    <img className="drink-img" src="https://s7d9.scene7.com/is/image/SAQ/12504257_is" />
                    <div className="drink-label">Rhum</div>

                </div>
                <div className={`grappa-choice drink-choice card ${this.state && this.state.active === drinkType.grappa ? "selected" : ""}`} onClick={() => this.onChoice(drinkType.grappa)}>
                    <img className="drink-img" src="https://s7d9.scene7.com/is/image/SAQ/11996069_is" />
                    <div className="drink-label">Grappa</div>

                </div>
                <div className={`cidre-choice drink-choice card ${this.state && this.state.active === drinkType.cidre ? "selected" : ""}`} onClick={() => this.onChoice(drinkType.cidre)}>
                    <img className="drink-img" src="https://s7d9.scene7.com/is/image/SAQ/12761544_is?" />
                    <div className="drink-label">Cider</div>

                </div>
                <div className={`liqueur-choice drink-choice card ${this.state && this.state.active === drinkType.liqueur ? "selected" : ""}`} onClick={() => this.onChoice(drinkType.liqueur)}>
                    <img className="drink-img" src="https://s7d9.scene7.com/is/image/SAQ/10349071_is" />
                    <div className="drink-label">Liquor</div>

                </div>
            </div>
        </div>
    }
}