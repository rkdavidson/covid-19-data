const DateRangeStats = {
  query(args, context) {
    console.log('[rkd] args:', args);

    if (!args?.select) {
      return null;
    }

    const { State } = context.controllers;

    if (args.select.locations?.ids) {
      const states = State.dataSource.getObjectsByRowIds(args.select.locations.ids);
      console.log('[rkd] states:', states);
      return states;
    }
    return [null, null];
  },
};

module.exports = DateRangeStats;
