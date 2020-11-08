const gql = require('graphql-tag');

module.exports = {
  typeDefs: gql`
    interface Location {
      id: ID!
      name: String!
    }

    input LocationInput {
      id: ID
      name: String
    }

    input LocationsInput {
      ids: [ID]
      names: [String]
    }
  `,
  resolvers: {
    Location: {
      __resolveType: (obj) => {
        console.log('[rkd] Location:', obj);
        return 'State';
      },
    },
  },
};
