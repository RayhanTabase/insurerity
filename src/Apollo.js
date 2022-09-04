import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SECRET } from '../secrets';

const httpLink = new HttpLink({
  uri: "https://test-demo-gql-backend.herokuapp.com/v1/graphql",
  headers: {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': SECRET
  },
});

const wsLink = new GraphQLWsLink(createClient({
  url: "https://test-demo-gql-backend.herokuapp.com/v1/graphql",
  connectionParams: {
   headers: {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': SECRET
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

const COMPLAINTS_SUBSCRIPTION = gql`
  subscription OnCommentAdded($postID: ID!) {
    commentAdded(postID: $postID) {
      id
      content
    }
  }
`;



export default client