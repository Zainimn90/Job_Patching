const sendAlert = require("../api/telegram")
const service = require("../services/NorekLessThn15")
const servicehistory = require("../services/HistoryServices");
const logger = require("../logger/logger")
const db_och = require("../connection/config_och_update");
const db_lcl = require("../connection/config_local");

class NorekLessThn15Controller {
    static async runJob() {
        try {
            logger.info("[NorekLessThn15Controller]")
            let flagIsContinue = true
            let lengthCount = 0

            do {
                const data = await service.getNorekLessThn15Befor(db_och, '', 'LIMIT 500')
                if (data.err) return sendAlert(`ERROR JOB PATCHING REK !!!`, "PATCHING REK")
                
                if (data.length === 0) {
                    flagIsContinue = false
                    break
                }
                if (data.err) {
                    flagIsContinue = false
                    sendAlert(`ERROR JOB PATCHING REK !!!`, "PATCHING REK")
                }
                await runJobBatch(data)
                lengthCount = lengthCount + data.length
            } while (flagIsContinue);
            
            if (lengthCount == 0) return sendAlert(`NO NEED PATCHING REK`)
            if (lengthCount > 0) return sendAlert(`JOB PATCHING REK ${lengthCount} !!!`, "PATCHING REK")
            return sendAlert(`PATCHING REK ${lengthCount} !!!`, "PATCHING REK")
        } catch (error) {
            logger.error(`[Get alert message from NorekLessThn15Controller: ${error}]`)
            return sendAlert(`ERROR JOB PATCHING REK !!!`, "PATCHING REK")
        }
    }
    
}

async function runJobBatch(dataBefore) {
    try {
        await db_och.query('BEGIN');
        await db_lcl.query('BEGIN');

        const payrollAccountNum = dataBefore.map(val => `'${val.payroll_account_num}'`).join(',');
        const data = await service.updateNorekLessThn15(db_och, payrollAccountNum)
        if (data.err) return sendAlert(`ERROR JOB PATCHING REK !!!`, "PATCHING REK")

        for (let i = 0; i < dataBefore.length; i++) {
            const { application_id } = dataBefore[i];
            const dataAfter = await service.getNorekLessThn15After(db_och, `and clat.application_id = '${application_id}'`, )
            const data = await servicehistory.insertHistory('/job_patching_rek_length', dataBefore[i], dataAfter[0], 'ececuser.clpa', "job", 'update', db_lcl)
            if (data.err) return sendAlert(`ERROR JOB PATCHING REK !!!`, "PATCHING REK")
        }

        await db_och.query('COMMIT');
        await db_lcl.query('COMMIT');
    } catch (error) {
        await db_och.query('ROLLBACK');
        await db_lcl.query('ROLLBACK');
        logger.error( `[Get alert message from NorekLessThn15Controller: ${error}]`)
        return sendAlert(`ERROR PATCHING REK !!!`, "PATCHING REK")
    }
}

module.exports = NorekLessThn15Controller





