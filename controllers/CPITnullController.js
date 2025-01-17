const sendAlert = require("../api/telegram")
const service = require("../services/CPITnull")
const servicehistory = require("../services/HistoryServices")
const logger = require("../logger/logger")
const db_och = require("../connection/config_och_update")
const db_lcl = require("../connection/config_local")

class CPITnullController {
    static async runJob() {
        try {
            logger.info("[Get alert message from CPITnullController]")
            await db_och.query('BEGIN');
            await db_lcl.query('BEGIN');

            const data = await service.jobCPITnull(db_och, db_lcl)

            if (data.length == 0) return sendAlert(`NO NEED INSERT CPIT`)

            if (!data) return sendAlert(`ERROR JOB CPIT !!!`, "CPIT IS NULL")

            let rowsAppId = []
            for (let i = 0; i < data.length; i++) {
                rowsAppId.push(rows[i].application_id)
            }

            const appId = rowsAppId.join(', ');

            const dataCpit = await service.getCPIT(db_och, appId)

            for (let i = 0; i < dataCpit.length; i++) {
                const lclPatch = await servicehistory.insertHistory('/patchCpitIsNull', "", dataCpit[i], 'ececuser.cpit', "job", 'insert', db_lcl)
                if (lclPatch.err) return sendAlert(`ERROR JOB CPIT IS NULL !!!`, "CPIT IS NULL")
            }

            sendAlert(`INSERT CPIT ${data.length} !!!`, "CPIT IS NULL")

            await db_och.query('COMMIT');
            await db_lcl.query('COMMIT');
        } catch (error) {
            await db_och.query('ROLLBACK');
            await db_lcl.query('ROLLBACK');
            logger.error(`[Get alert message from CPITnullController: ${error}]`)
            return sendAlert(`ERROR JOB CPIT !!!`, "CPIT IS NULL")
        }
    }
    
}

module.exports = CPITnullController