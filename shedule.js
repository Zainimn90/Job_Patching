require("dotenv").config();
const logger = require("./logger/logger");
const schedule = require('node-schedule');
const DISBINPROCESSController = require("./controllers/DISBINPROCESSController");
const NorekLessThn15Controller = require("./controllers/NorekLessThn15Controller");

logger.info("[START JOB SCHEDULER]");
schedule.scheduleJob(process.env.SCHEDULE, async () => {
    logger.info("[RUN]");
    await DISBINPROCESSController.runJob();
    await NorekLessThn15Controller.runJob();
});
