"use strict";
const winston = require("winston");
const colorizer = winston.format.colorize();

const options = {
  file: {
    level: "info",
    filename: "./logs/Job_Alif.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: true,
  },
  console: {
    levels: "info",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  format: winston.format.combine(
    winston.format.label({ label: `JOB_ALIF` }),
    winston.format.timestamp({ format: "YYYY-MMM-DD HH:mm:ss" }),
    winston.format.printf((info) => 
      colorizer.colorize(info.level,`[${info.timestamp}] ${info.label}: [${info.level}]${info.message}`)
    )
  ),
  exitOnError: false,
});

module.exports = logger;
