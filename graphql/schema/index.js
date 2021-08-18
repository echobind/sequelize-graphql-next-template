const { gql } = require('apollo-server-micro');

const typeDefs = gql`  
  type Query {
    sampleQuery: String!
  }

  type Mutation {
    sampleMutation: String!
  }
`;

export default typeDefs