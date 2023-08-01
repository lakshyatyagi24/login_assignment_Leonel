const path = require(`path`);
const alias = require(`./aliases`);
const { aliasWebpack } = require('react-app-alias');
const dotenv = require('dotenv');

const SRC = `./src`;
const aliases = alias(SRC);

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [key, path.resolve(__dirname, value)])
);

const options = {
  alias: resolvedAliases,
};

module.exports = function override(config) {
  dotenv.config();

  console.log(process.env.REACT_APP_API_URL);
  config.ignoreWarnings = [{ message: /Failed to parse source map/ }];

  return aliasWebpack(options)(config);
};
