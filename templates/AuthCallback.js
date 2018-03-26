import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import webAuth, { TOKEN_NAME } from "./auth0_config.js";
import { graphql } from "react-apollo";

import {
  is_authenticated_query,
  authenticate_user_mutation
} from "./auth_graphql.js";

class AuthCallbackComponent extends Component {
  componentWillMount() {
    webAuth.parseHash(async (err, authResult) => {
      if (err) return console.error(err);
      if (authResult && authResult.idToken) {
        const result = await this.props.authenticate_user_mutation({
          variables: { idToken: authResult.idToken }
        });
        const graphcool_token = result.data.authenticateUser.token;
        window.localStorage.setItem(TOKEN_NAME, graphcool_token);
        this.props.is_authenticated_query.refetch();
        this.props.history.push("/");
      }
    });
  }

  render() {
    return <div>Authenticating...</div>;
  }
}

const AuthCallback = withRouter(
  graphql(is_authenticated_query, {
    name: "is_authenticated_query",
    options: { fetchPolicy: "network-only" }
  })(
    graphql(authenticate_user_mutation, {
      name: "authenticate_user_mutation"
    })(AuthCallbackComponent)
  )
);

export default AuthCallback;
