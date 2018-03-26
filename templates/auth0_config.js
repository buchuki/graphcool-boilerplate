import auth0 from "auth0-js";

const webAuth = new auth0.WebAuth({
  clientID: "__AUTH0_CLIENT_ID__",
  domain: "__AUTH0_DOMAIN__",
  redirectUri:
    window.location.protocol + "//" + window.location.host + "/auth0_callback",
  responseType: "id_token",
  scope: "openid"
});

export default webAuth;

export const TOKEN_NAME = "__APPNAME__Auth0Token";
