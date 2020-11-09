const { ApolloServer } = require('apollo-server');
const chalk = require('chalk');

const db = require('./db');
console.log('[rkd] db:', db);

const line = '-------------------------------------------------------';
console.log(chalk.bold.green(`\n${line}\nLaunching server\n${line}`));

const { makeAppSchema } = require('./schema');
const { schema, context } = makeAppSchema({ enableLogging: true });

const server = new ApolloServer({
  schema,
  context,
});

server.listen().then(({ url }) => {
  console.log(`\n🚀  Server ready at ${chalk.blue.underline(url)}`);
});
