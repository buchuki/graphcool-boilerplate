import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import webAuth, { TOKEN_NAME } from "./auth0_config.js";
import { Mutation } from "react-apollo";

import { authenticate_user_mutation } from "./auth_graphql.js";

class AuthCallbackComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth0_token: null,
      auth0_error: null
    };
    this.authenticated = false;
  }
  componentWillMount() {
    webAuth.parseHash(async (err, authResult) => {
      if (err) {
        console.log(err);
        this.setState({ auth0_error: err });
      }
      if (authResult && authResult.idToken) {
        this.setState({ auth0_token: authResult.idToken });
        const result = await this.props.authenticate_user_mutation({
          variables: { idToken: this.state.auth0_token }
        });
        console.log(result.data);
        const graphcool_token = result.data.authenticateUser.token;
        window.localStorage.setItem(TOKEN_NAME, graphcool_token);
        this.props.history.push("/");
      }
    });
  }

  render() {
    if (this.state.auth0_token) return <div>authenticated</div>;
    if (this.state.auth0_error) return <div>Can't authenticate</div>;
    return <div>authenticating</div>;
  }
}

class AuthCallbackContainer extends Component {
  constructor(props) {
    super(props);
    // Was having issue with the AuthCallbackComponent rendering
    // multiple times inside the mutation, which kicked off the
    // hash parsing dance multiple times in componentWillMount.
    // Surely this isn't the correct fix...
    this.auth_once = false;
  }
  render() {
    return (
      <Mutation mutation={authenticate_user_mutation}>
        {(authenticate_user_mutation, { loading }) => {
          if (loading || this.auth_once) {
            return "confirming credentials...";
          }
          this.auth_once = true;
          return (
            <AuthCallbackComponent
              authenticate_user_mutation={authenticate_user_mutation}
              history={this.props.history}
            />
          );
        }}
      </Mutation>
    );
  }
}

const AuthCallback = withRouter(AuthCallbackContainer);

export default AuthCallback;
