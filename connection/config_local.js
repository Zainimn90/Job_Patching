const { Pool } = require("pg");

const pool_db_local = new Pool({
  user: process.env.DB_USER_LCL,
  host: process.env.DB_HOST_LCL,
  database: process.env.DB_NAME_LCL,
  password: process.env.DB_PASSWORD_LCL,
  port: process.env.DB_PORT_LCL,
});

module.exports = pool_db_local;
