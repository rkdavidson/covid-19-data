const fs = require('fs');
const path = require('path');

const CsvData = require('../../utils/CsvData');

const extractIdFromName = (getRowColumnValue) => {
  return getRowColumnValue('state').toLowerCase().replace(' ', '-');
};

// Populations
const statePopulationsCsvData = new CsvData({
  csvFile: 'processed/us-state-populations.csv',
  idExtractor: extractIdFromName,
});
const statePopulations = Object.fromEntries(statePopulationsCsvData.rows);

// States
const statesCsvData = new CsvData({
  csvFile: 'processed/us-states.csv',
  rowIdExtractor: extractIdFromName,
  derivedColumns: [
    {
      name: 'population',
      valueCreator: (rowObject) => statePopulations[rowObject.name],
    },
  ],
});

module.exports = statesCsvData;
