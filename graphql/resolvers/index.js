const resolvers = {
  Query: {
    sampleQuery() {
      return 'sample query'
    }
  },
  Mutation: {
    sampleMutation() {
      return 'sample mutation'
    }
  }
};

export default resolvers;
