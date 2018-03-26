import gql from "graphql-tag";

export const authenticate_user_mutation = gql`
  mutation($idToken: String!) {
    authenticateUser(idToken: $idToken) {
      id
      token
    }
  }
`;

export const is_authenticated_query = gql`
  {
    user {
      auth0UserId
    }
  }
`;
