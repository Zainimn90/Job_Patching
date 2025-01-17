const sendAlert = require("../api/telegram")
const service = require("../services/CPITnull")
const logger = require("../logger/logger")
// const exe = require("../helper/retry")

class JobCPITnullController {
    static async runJob() {
        try {
            logger.info("[Get alert message from JobCPITnullController]")
            const data = await service.getJobCPITnull()
            if (data.length == 0) return sendAlert(`TIDAK PERLU INSERT CPIT`)

            if (!data) return sendAlert(`JOB CPIT GAGAL !!!`, "CPIT IS NULL")

            return sendAlert(`INSERT CPIT ${data.length} !!!`, "CPIT IS NULL")
        } catch (error) {
            logger.error(
                `[Get alert message from JobCPITnullController: ${error}]`
            )
            return sendAlert(`JOB CPIT GAGAL !!!`, "CPIT IS NULL")
        }
    }
    
}

module.exports = JobCPITnullController