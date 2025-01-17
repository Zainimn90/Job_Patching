const sendAlert = require("../api/telegram")
const service = require("../services/NorekLessThn15")
const logger = require("../logger/logger")
const db_och = require("../connection/config_och_update");

class GetNorekLessThn15Controller {
    static async runJob() {
        try {
            logger.info("[GetNorekLessThn15Controller]")
            const data = await service.getNorekLessThn15Befor(db_och, '', '')
            const lengthCount = data.length
            if (data.length === 0) return sendAlert(`NO NEED PATCHING REK`, "PATCHING REK")
            if (lengthCount > 0) return sendAlert(`NEED PATCHING REK ${lengthCount} !!!`, "PATCHING REK")
            return sendAlert(`PATCHING REK ${lengthCount} !!!`, "PATCHING REK")
        } catch (error) {
            logger.error(`[Get alert message from GetNorekLessThn15Controller: ${error}]`)
            return sendAlert(`ERROR JOB PATCHING REK !!!`, "PATCHING REK")
        }
    }
    
}

module.exports = GetNorekLessThn15Controller





