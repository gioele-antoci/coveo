
/// <reference path="../node_modules/coveo-search-ui/bin/ts/CoveoJsSearch.d.ts" />

import * as React from 'react';
import Home from './Home';
import DrinkType from './DrinkType';
import FoodType from './FoodType';
import FoodVsDrink from './FoodVsDrink';
import TastesType from './TastesType';
import Results from './Results';
import Navigator from './Navigator';

import queryHelper from './queryHelper';

import './css/App.css';
import { page, tasteObservations, drinkType, foodDrinkPriority } from './interfaces';

class App extends React.Component<null,
  {
    activePage: page,
    foodDrinkPreference?: foodDrinkPriority,
    drinkPreference?: drinkType,
    foodPreference?: string,
    tastePreference?: tasteObservations
  }> {



  constructor(props) {
    super(props);
    this.state = { activePage: page.home };
    queryHelper.setup();
  }


  private goNext() {
    let nextPage = page.results;

    switch (this.state.activePage) {
      case page.foodType:
      case page.drinkType:
        nextPage = page.tastesType;
        break;

      case page.tastesType:
        page.results;
        break;
    }

    this.goToPage(nextPage);
  }

  private goToPage(page: page) {
    this.setState({ activePage: page });
  }

  private reset() {
    this.setState({ activePage: page.foodVsdrink });
    queryHelper.setup();
  }

  onDrinkTypeChoice(choice: drinkType) {
    this.setState({ drinkPreference: choice });
    this.goToPage(page.tastesType);
  }

  onFoodTypeChoice(choice: string) {
    this.setState({ foodPreference: choice });
    this.goToPage(page.tastesType);
  }

  onFoodVsDrinkChoice(choice: foodDrinkPriority) {
    this.setState({ foodDrinkPreference: choice });
    const nextPage = choice === foodDrinkPriority.drink ? page.drinkType : page.foodType;
    this.goToPage(nextPage);
  }

  private getPageComponent(activePage: page) {
    switch (activePage) {
      case page.home:
        return (<Home onStart={() => this.goToPage(page.foodVsdrink)} />);

      case page.foodVsdrink:
        return (<FoodVsDrink active={this.state.foodDrinkPreference} onChoice={(choice) => this.onFoodVsDrinkChoice(choice)} />);

      case page.drinkType:
        return (<DrinkType active={this.state.drinkPreference} onChoice={(choice) => this.onDrinkTypeChoice(choice)} />);

      case page.foodType:
        return (<FoodType active={this.state.foodPreference} onChoice={(choice) => this.onFoodTypeChoice(choice)} />);

      case page.tastesType:
        return (<TastesType />);

      case page.results:
        return (<Results />);
    }
  }

  private getNavigator(activePage: page) {
    const skipEnabled =
      activePage !== page.results &&
      activePage !== page.foodVsdrink &&
      activePage !== page.home;

    const resetEnabled = activePage !== page.home;
    return (<Navigator skip={skipEnabled} reset={resetEnabled} onSkip={() => this.goNext()} onReset={() => this.reset()} />)
  }

  private getHeaderLabel(activePage: page): string {
    switch (activePage) {
      case page.drinkType:
        return "What kind of drink do you feel like drinking?";

      case page.foodType:
        return "What kind of food do you feel like eating?";

      case page.foodVsdrink:
        return "Are you more of a food or drink person?";

      case page.home:
        return "Drin-Que?";

      case page.tastesType:
        return "Tell me more about your drink taste";

      case page.results:
        return "My suggestions";
    }
  }


  render() {
    return (
      <div className="App">
        <div className="header"><div className="header-label">{this.getHeaderLabel(this.state.activePage)}</div></div>
        <div className="page-container">{this.getPageComponent(this.state.activePage)}</div>
        <div className="navigator-container">{this.getNavigator(this.state.activePage)}</div>
      </div>
    );
  }
}



export default App;
