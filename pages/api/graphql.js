import { ApolloServer } from 'apollo-server-micro';
import models from '../../db/models';
import { resolvers, typeDefs } from '../../graphql';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models },
});

const serverStart = server.start()

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await serverStart
  await server.createHandler({
    path: '/api/graphql',
  })(req, res)
}

export const config = {
  api: {
    bodyParser: false,
  },
}