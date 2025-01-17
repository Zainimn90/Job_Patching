const request = require("request");
const logger = require("../logger/logger");

async function sendAlert(alertMessage, status) {
  logger.info("[Send Alert to Telegram]");
  console.log(alertMessage);
  await request(
    {
      url: `${process.env.HOST_TELEGRAM}/bot${process.env.TOKEN_TELEGRAM}/sendMessage?chat_id=${process.env.CHAT_ID}&text=${alertMessage}`,
      method: "GET",
    },
    await function (error, response) {
      if (error) {
        logger.error(`[Send Alert to Telegram: ${error}]`);
      } else {
        if (response.statusCode != 200) {
          logger.error(`[Send Alert to Telegram: ${response.statusCode}]`);
        }else{
          logger.info(`[Send Alert to Telegram: SUCCESS ${response.statusCode}]`);
        }
      }
      console.log(status);
    }
  );
}

module.exports = sendAlert;
