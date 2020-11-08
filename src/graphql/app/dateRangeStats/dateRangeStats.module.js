const gql = require('graphql-tag');
const DateRangeStats = require('./controller');

module.exports = {
  typeDefs: gql`
    type DateRangeStats {
      locations: [Location]
      startDate: Date
      endDate: Date
      casesTotal: Int
      deathsTotal: Int
      dateStats: [DateStats]
    }

    input DateRangeStatsSelect {
      locations: LocationsInput
      startDate: Date
      endDate: Date
    }

    type DateStats {
      location: Location
      date: Date
      cases: Int
      deaths: Int
    }

    extend type Query {
      dateRangeStats(select: DateRangeStatsSelect!): DateRangeStats
    }
  `,
  resolvers: {
    Query: {
      dateRangeStats: (root, args, context, info) => DateRangeStats.query(args, context),
    },
    DateRangeStats: {},
  },
};
