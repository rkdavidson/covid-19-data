const glob = require('glob');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// ---

const ENABLE_LOGGING = 1;

const log = ENABLE_LOGGING ? console.log : () => null;

const logTitle = (num) =>
  log(
    chalk.bold.yellow(
      `\nImporting ${chalk.bold.gray('(' + num + ')')} app module${num === 1 ? '' : 's'}...`
    )
  );

const logListItem = (index, length, name, path) =>
  log(
    `  ${index === length - 1 ? '└' : '├'}─ ${chalk.yellow(name)} ` + chalk.dim.gray(`▸ ${path}`)
  );

// ---

const moduleSubFiles = {
  controller: 'controller.js',
  // dataSource: 'dataSource.js',
};

function getAppModuleSubFiles(modulePath) {
  // Dynamically import existing sub-files using key/path pairs from above ☝️.
  return Object.entries(moduleSubFiles).reduce((output, [outputKey, fileName]) => {
    const filePath = path.join(modulePath, fileName);
    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
      output[outputKey] = require(filePath);
    }

    return output;
  }, {});
}

function getAppModules() {
  const appModules = {};

  try {
    const moduleFiles = glob.sync('**/*.module.js', { cwd: 'src/graphql/app' });

    logTitle(moduleFiles.length);

    moduleFiles.forEach((file, index) => {
      const moduleName = path.dirname(file);
      const modulePath = path.join(__dirname, file);
      const moduleFolder = path.join(__dirname, moduleName);

      logListItem(index, moduleFiles.length, moduleName, `src/graphql/app/${moduleName}/${file}`);

      appModules[moduleName] = {
        appModule: true,
        ...require(modulePath),
        ...getAppModuleSubFiles(moduleFolder),
      };
    });
  } catch (error) {
    console.error(error);
  }

  return appModules;
}

module.exports = getAppModules();
