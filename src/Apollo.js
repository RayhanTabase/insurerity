import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const httpLink = new HttpLink({
  uri: "https://test-demo-gql-backend.herokuapp.com/v1/graphql",
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'https://test-demo-gql-backend.herokuapp.com/v1/graphql',
  connectionParams: async () => {
    return {
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'SECRET'
      },
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