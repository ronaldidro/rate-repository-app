import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  mutation authorize($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;
