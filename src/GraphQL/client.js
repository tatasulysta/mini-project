import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: "https://clean-gibbon-21.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "eRHTQqFLhEz2rePnq9cCtnj0gdZlL2bWkWd61e5GYiJ2rEMCfA3QaECWgGHKlgYv",
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://clean-gibbon-21.hasura.app/v1/graphql",
    connectionParams: {
      headers: {
        "x-hasura-admin-secret":
          "eRHTQqFLhEz2rePnq9cCtnj0gdZlL2bWkWd61e5GYiJ2rEMCfA3QaECWgGHKlgYv",
      },
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
