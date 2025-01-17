const sendAlert = require("../api/telegram")
const serviceOch = require("../services/AnomalyDISBINPROCESSOch")
const serviceCoreRaya = require("../services/AnomalyDISBINPROCESSCoreRaya")
const logger = require("../logger/logger")
const db_och = require("../connection/config_och_update");
const db_core_raya = require("../connection/config_core_raya");

class GetDISBINPROCESSController {
    static async runJob() {
        try {
            logger.info("[GetDISBINPROCESSController]")
            await db_och.query('BEGIN');

            const dataOch = await serviceOch.getAnomalyDISBINPROCESS(db_och)
            if (dataOch.err) return sendAlert(`ERROR GET DISBINPROCESS !!!`, "GET DISBINPROCESS")
            let dataCoreRaya
            const nik = dataOch.map(val => `'${val.pan_national_id}'`).join(',');            
            if (!nik) return sendAlert(`NO DISBINPROCESS YESTERDAY !!!`, "GET DISBINPROCESS")

            if (nik) {
                dataCoreRaya = await serviceCoreRaya.getAnomalyDISBINPROCESS(db_core_raya, nik)
                if (dataCoreRaya.err) return sendAlert(`NO DISBINPROCESS NEED PATCH YESTERDAY !!!`, "GET DISBINPROCESS")
                if (dataCoreRaya.length == 0) return
            }
            
            let count = 0;
            dataOch.forEach(itemOch => {
                if (dataCoreRaya.some(itemCoreRaya => itemCoreRaya.NIK === itemOch.pan_national_id)) {
                    count++;
                }
            });
            
            return sendAlert(`${count} ACCOUNT DISBINPROCESS NEED PATCH YESTERDAY`, "GET DISBINPROCESS")
        } catch (error) {
            logger.error(`[Get alert message from GetDISBINPROCESSController: ${error}]`)
            return sendAlert(`ERROR GET DISBINPROCESS !!!`, "GET DISBINPROCESS")
        }
    }   
}

module.exports = GetDISBINPROCESSController





