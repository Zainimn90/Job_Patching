require('dotenv').config()
const logger = require("./logger/logger");
const schedule = require("node-schedule");
const exec = require('child_process').exec;

exec('app.sh', (error, stdout, stderr) => {
    if (error) {
        logger.error(`[Run Service: ${error}]`);
    }
})

schedule.scheduleJob(process.env.SCHEDULE_START, async () => {
    console.log("RE RUN");
    exec('app.sh', (error, stdout, stderr) => {
        if (error) {
            logger.error(`[Run Service: ${error}]`);
        }
    })
});
