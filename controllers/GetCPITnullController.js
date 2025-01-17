const sendAlert = require("../api/telegram")
const serviceOch = require("../services/CPITnull")
const logger = require("../logger/logger")
const db_och = require("../connection/config_och_update")

class GetCPITnullController {
    static async runJob() {
        try {
            logger.info("[GetCPITnullController]")

            const data = await serviceOch.getJobCPITnull(db_och)
            if (data.length == 0) return sendAlert(`NO NEED INSERT CPIT`, "CPIT IS NULL")
            if (!data) return sendAlert(`ERROR GET CPIT IS NULL !!!`, "CPIT IS NULL")
                
            return sendAlert(`NEED INSERT CPIT ${data.length} !!!`, "CPIT IS NULL")
        } catch (error) {
            logger.error(
                `[Get alert message from GetCPITnullController: ${error}]`
            )
            return sendAlert(`ERROR GET CPIT IS NULL !!!`, "CPIT IS NULL")
        }
    }
    
}

module.exports = GetCPITnullController