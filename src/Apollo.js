import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import {KEY} from './ENCRYPT';

const httpLink = new HttpLink({
  uri: "https://test-demo-gql-backend.herokuapp.com/v1/graphql",
  headers: {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': KEY
  },
});

const wsLink = new GraphQLWsLink(createClient({
  url: "wss://test-demo-gql-backend.herokuapp.com/v1/graphql",
  connectionParams: {
   headers: {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': KEY
   }
  },
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

export default client
