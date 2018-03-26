import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { TOKEN_NAME } from "./authentication/auth0_config.js";

const httpLink = new HttpLink({
  uri: "__GRAPHCOOL_ENDPOINT__"
});

// middleware to put auth header in localstorage
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(TOKEN_NAME);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const apollo_client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default apollo_client;
