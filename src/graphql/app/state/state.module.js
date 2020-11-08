const gql = require('graphql-tag');
const State = require('./controller');

module.exports = {
  typeDefs: gql`
    type State implements Location {
      id: ID!
      name: String!
      population: Int
      mostRecentDataDate: Date
      casesTotal: Int
      deathsTotal: Int
      # counties: [County]
    }

    # Single query
    input StateSelect {
      name: String!
    }

    # Many query
    input StatesSelect {
      ids: [ID]
      minPopulation: Int
      maxPopulation: Int
    }

    extend type Query {
      state(select: StateSelect!): State
      states(select: StatesSelect!): [State]
    }
  `,
  resolvers: {
    Query: {
      state: (root, args, context, info) => State.findOne(args, context),
      states: (root, args, context, info) => State.query(args),
    },
  },
};
