import { useApolloClient, useMutation } from "@apollo/client";

import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: { credentials: { username, password } },
    });

    if (response.data) await setToken(response.data.authenticate.accessToken);
  };

  const setToken = async (token) => {
    await authStorage.setAccessToken(token);
    apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;
