
/// <reference path="../node_modules/coveo-search-ui/bin/ts/CoveoJsSearch.d.ts" />

import * as React from 'react';
import Home from './Home';
import DrinkType from './DrinkType';
import FoodType from './FoodType';
import FoodVsDrink from './FoodVsDrink';
import TastesType from './TastesType';
import Results from './Results';
import Navigator from './Navigator';

import './css/App.css';
import { QueryBuilder, SearchEndpoint } from 'coveo-search-ui';
import { page, tasteObservations, drinkType, foodDrinkPriority } from './interfaces';

class App extends React.Component<null,
  {
    activePage: page,
    foodDrinkPreference?: foodDrinkPriority,
    drinkPreference?: drinkType,
    tastePreference?: tasteObservations
  }> {

  private queryBuilder: QueryBuilder;
  private endpoint: SearchEndpoint;

  constructor(props) {
    super(props);
    this.state = { activePage: page.home };
    this.queryBuilder = new QueryBuilder();
    this.endpoint = new SearchEndpoint({ accessToken: "058c85fd-3c79-42a3-9236-b83d35588103", restUri: "https://cloudplatform.coveo.com/rest/search" });
    SearchEndpoint.endpoints["default"] = this.endpoint;

    this.endpoint.search({ q: "vin" });
  }

  private goNext() {
    if (this.state.activePage !== page.results) {
      this.setState({ activePage: page[page[this.state.activePage + 1]] });
    }
  }

  private goPrevious() {
    if (this.state.activePage !== page.home) {
      this.setState({ activePage: page[page[this.state.activePage - 1]] });
    }
  }

  private reset() {
    this.setState({ activePage: page.foodVsdrink });
  }

  private getPageComponent() {
    switch (this.state.activePage) {
      case page.home:
        return (<Home />);

      case page.foodVsdrink:
        return (<FoodVsDrink active={this.state.foodDrinkPreference} onChoice={(choice) => this.setState({ foodDrinkPreference: choice })} />);

      case page.drinkType:
        return (<DrinkType />);

      case page.foodType:
        return (<FoodType />);

      case page.tastesType:
        return (<TastesType />);

      case page.results:
        return (<Results />);
    }
  }

  private getNavigator() {
    const prevEnabled = this.state.activePage !== page.home;
    const nextEnabled = this.state.activePage !== page.results;

    return (<Navigator previous={prevEnabled} next={nextEnabled} onPrevious={() => this.goPrevious()} onNext={() => this.goNext()} onReset={() => this.reset()} />)
  }

  private getHeaderLabel(): string {
    return page[this.state.activePage];
  }


  render() {
    return (
      <div className="App">
        <div className="header">{this.getHeaderLabel()}</div>
        <div className="page-container">{this.getPageComponent()}</div>
        <div className="navigator-container">{this.getNavigator()}</div>

      </div>
    );
  }
}



export default App;
