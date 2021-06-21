import { ApolloServer, gql } from 'apollo-server-micro';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    async hello() {
      return 'hello';
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: { endpoint: '/api/graphql' }
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default server.createHandler({
  path: '/api/graphql'
});
