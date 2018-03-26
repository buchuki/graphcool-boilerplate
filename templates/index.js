import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import apollo_client from "./init_apollo.js";

import App from "./App.js";
import AuthCallback from "./authentication/AuthCallback.js";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={apollo_client}>
      <Switch>
        <Route exact path="/auth0_callback" component={AuthCallback} />
        <Route>
          <App />
        </Route>
      </Switch>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
