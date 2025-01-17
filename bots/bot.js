const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.TOKEN_TELEGRAM, {
  telegram: {
    polling: true,
  },
  handlerTimeout: 9_000_000,
});

module.exports = bot;
