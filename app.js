require("dotenv").config();
const logger = require("./logger/logger");
const bot = require("./bots/bot");
const Validate = require("./helper/validate")
const schedule = require("node-schedule");

const GetNorekLessThn15Controller = require("./controllers/GetNorekLessThn15Controller");
const GetDISBINPROCESSController = require("./controllers/GetDISBINPROCESSController");

const NorekLessThn15Controller = require("./controllers/NorekLessThn15Controller");
const DISBINPROCESSController = require("./controllers/DISBINPROCESSController");

logger.info("[START BOT]");

bot.help(async (ctx) => {
  if (Validate(ctx) == false) return false

  await ctx.reply(`
1. /getNorekLessThan15
2. /getDisburseInProcessYesterday

3. /patchNorekLessThan15
4. /patchgetDisburseInProcessYesterday
  `);
});

bot.command("/getNorekLessThan15", async (ctx) => {
  if (Validate(ctx) == false) return false
  return await JobWlDailyConttroller.runJob(ctx);
});

bot.on("message", async (ctx) => {    
    if (Validate(ctx) == false) return false
    const text = ctx.message.text ? ctx.message.text.split("@") : [];
    const caption = text[0];

    if (caption == "/getNorekLessThan15") {
        return await GetNorekLessThn15Controller.runJob(ctx);
    }

    if (caption == "/getDisburseInProcessYesterday") {
        return await GetDISBINPROCESSController.runJob(ctx);
    }

    if (caption == "/patchNorekLessThan15") {
        return await NorekLessThn15Controller.runJob(ctx);
    }

    if (caption == "/patchgetDisburseInProcessYesterday") {
        return await DISBINPROCESSController.runJob(ctx);
    }
});
  
bot.launch();

schedule.scheduleJob(process.env.SCHEDULE_STOP, async () => {
  logger.info("[STOP BOT]");
  process.exit();
});
  
