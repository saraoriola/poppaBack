const config = require("./config");
const components = require("./components");
const users = require("./users");

module.exports = {
  ...config,
  ...components,
  ...users,
};
