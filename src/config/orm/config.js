const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = require("../constants");

const config = {
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: "mysql",
};

module.exports = {
  development: config,
  test: config,
  production: config,
};
