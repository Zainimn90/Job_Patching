const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER_OCH_UPDATE,
  host: process.env.DB_HOST_OCH_UPDATE,
  database: process.env.DB_NAME_OCH_UPDATE,
  password: process.env.DB_PASSWORD_OCH_UPDATE,
  port: process.env.DB_PORT_OCH_UPDATE,
});

module.exports = pool;
