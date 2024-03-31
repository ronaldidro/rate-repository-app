import { useQuery } from "@apollo/client";

import { GET_CURRENT_USER } from "../graphql/queries";

const useMe = (variables) => {
  const { data, ...result } = useQuery(GET_CURRENT_USER, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  return { user: data?.me, ...result };
};

export default useMe;
