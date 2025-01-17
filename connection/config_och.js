const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER_OCH,
  host: process.env.DB_HOST_OCH,
  database: process.env.DB_NAME_OCH,
  password: process.env.DB_PASSWORD_OCH,
  port: process.env.DB_PORT_OCH,
});

module.exports = pool;
