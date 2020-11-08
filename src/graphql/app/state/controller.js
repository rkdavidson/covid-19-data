const dataSource = require('./dataSource');

const State = {
  dataSource,
  createFromRow(row) {
    return dataSource.getObjectFromRow(row, {
      includeColumns: ['state', 'population', 'date', 'casesCumulative', 'deathsCumulative'],
      renameColumns: {
        state: 'name',
        date: 'mostRecentDataDate',
        casesCumulative: 'casesTotal',
        deathsCumulative: 'deathsTotal',
      },
    });
  },
  findOne(args, context) {
    if (!args?.select) return null;

    if (args.select.name) {
      const result = dataSource
        .filterByColumn('state', args.select.name, { reverseSort: true, limit: 1 })
        .pop();

      return this.createFromRow(result);
    }
  },
  query(args) {
    console.log('[rkd] args:', args);
    return [null, null];
  },
};

module.exports = State;
