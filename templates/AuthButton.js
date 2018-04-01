import React, { Component } from "react";
import webAuth, { TOKEN_NAME } from "./auth0_config.js";
import apollo_client from "../init_apollo.js";
import { is_authenticated_query } from "./auth_graphql.js";
import { Query } from "react-apollo";

class AuthButton extends Component {
  render() {
    return (
      <Query query={is_authenticated_query}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <button onClick={() => this.login()} disabled>
                Login
              </button>
            );
          }
          if (!data.user || !data.user.auth0UserId) {
            return <button onClick={() => this.login()}>Login</button>;
          }
          return <button onClick={() => this.logout()}>Logout</button>;
        }}
      </Query>
    );
  }

  login() {
    webAuth.authorize();
  }
  logout() {
    window.localStorage.removeItem(TOKEN_NAME);
    apollo_client.resetStore();
    webAuth.logout({
      returnTo: window.location.protocol + "//" + window.location.host + "/"
    });
  }
}

export default AuthButton;
