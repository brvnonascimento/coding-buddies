import { ApolloServer, gql } from 'apollo-server-micro';
import { PusherChannel } from 'graphql-pusher-subscriptions';

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Subscription {
    somethingChanged: String
  }
`;

export const pubsub = new PusherChannel({
  appId: process.env.PUSHER_APP_ID ?? '',
  key: process.env.PUSHER_KEY ?? '',
  secret: process.env.PUSHER_SECRET ?? '',
  cluster: process.env.PUSHER_CLUSTER ?? '',
  channel: process.env.PUSHER_CHANNEL ?? ''
});

const resolvers = {
  Query: {
    async hello() {
      return 'hello';
    }
  },
  Subscription: {
    somethingChanged: {
      subscribe: () => pubsub.asyncIterator(['SOMETHING_CHANGED'])
    }
  }
};

const subscriptionEndpoint = '/api/graphql/subscriptions';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: {
    endpoint: '/api/graphql',
    subscriptionEndpoint
  },
  subscriptions: {
    path: subscriptionEndpoint
  }
});

export const config = {
  api: {
    bodyParser: false
  }
};

const graphqlWithSubscriptionHandler = (req: any, res: any, next: any) => {
  if (!res.socket.server.apolloServer) {
    console.log(`* apolloServer first use *`);

    server.installSubscriptionHandlers(res.socket.server);
    const handler = server.createHandler({ path: '/api/graphql' });
    res.socket.server.apolloServer = handler;
  }

  return res.socket.server.apolloServer(req, res, next);
};

export default graphqlWithSubscriptionHandler;
