import React, { Component } from "react";
import webAuth, { TOKEN_NAME } from "./auth0_config.js";
import apollo_client from "../init_apollo.js";
import { is_authenticated_query } from "./auth_graphql.js";
import { graphql } from "react-apollo";

class AuthButtonComponent extends Component {
  render() {
    if (this.props.is_authenticated_query.loading) {
      return (
        <button onClick={() => this.login()} disabled>
          Login
        </button>
      );
    }
    if (
      !this.props.is_authenticated_query.user ||
      !this.props.is_authenticated_query.user.auth0UserId
    ) {
      return <button onClick={() => this.login()}>Login</button>;
    }
    return <button onClick={() => this.logout()}>Logout</button>;
  }

  login() {
    webAuth.authorize();
  }
  logout() {
    window.localStorage.removeItem(TOKEN_NAME);
    apollo_client.resetStore();
    this.props.is_authenticated_query.refetch();
  }
}

const AuthButton = graphql(is_authenticated_query, {
  name: "is_authenticated_query",
  options: { fetchPolicy: "network-only" }
})(AuthButtonComponent);

export default AuthButton;
