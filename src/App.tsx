
/// <reference path="../node_modules/coveo-search-ui/bin/ts/CoveoJsSearch.d.ts" />

import * as React from 'react';
import './App.css';
import { QueryBuilder, SearchEndpoint } from 'coveo-search-ui';

class App extends React.Component<null, null> {
  private queryBuilder: QueryBuilder;
  private endpoint: SearchEndpoint;

  constructor(props) {
    super(props);

    this.queryBuilder = new QueryBuilder();
    this.endpoint = new SearchEndpoint({ accessToken: "058c85fd-3c79-42a3-9236-b83d35588103", restUri: "https://cloudplatform.coveo.com/rest/search" });
    SearchEndpoint.endpoints["default"] = this.endpoint;

    this.endpoint.search({ q: "vin" });
  }

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
