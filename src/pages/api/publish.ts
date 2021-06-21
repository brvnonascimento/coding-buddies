import { pubsub } from './graphql';

export default async (_: any, res: any) => {
  await pubsub.publish('SOMETHING_CHANGED', {
    somethingChanged: 'Something Changed'
  });

  res.status(200).json({ message: 'OK' });
};
