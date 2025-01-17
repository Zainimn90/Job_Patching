const sendAlert = require("../api/telegram")
const serviceOch = require("../services/AnomalyDISBINPROCESSOch")
const serviceCoreRaya = require("../services/AnomalyDISBINPROCESSCoreRaya")
const logger = require("../logger/logger")
const db_och = require("../connection/config_och_update");
const db_core_raya = require("../connection/config_core_raya");
const db_lcl = require("../connection/config_local");

const singleGroup = require("../helper/singleGroup");

class DISBINPROCESSController {
    static async runJob() {
        try {
            logger.info("[DISBINPROCESSController]")
            await db_och.query('BEGIN');
            await db_lcl.query('BEGIN');

            const dataOch = await serviceOch.getAnomalyDISBINPROCESS(db_och)
            if (dataOch.err) return sendAlert(`ERROR JOB DISBINPROCESS !!!`, "PATCHING DISBINPROCESS")

            const nik = dataOch.map(val => `'${val.pan_national_id}'`).join(',');            
            if (!nik) return sendAlert(`NO NEED JOB DISBINPROCESS !!!`, "PATCHING DISBINPROCESS");
           
            let fl = [];
            let dt = [];
            let flMultiple = [];
            let dtMultiple = [];
            let dataNotInCore = [];

            let dataCoreRaya

            if (nik) {
                dataCoreRaya = await serviceCoreRaya.getAnomalyDISBINPROCESS(db_core_raya, nik)
                if (dataCoreRaya.err) return sendAlert(`ERROR JOB DISBINPROCESS !!!`, "PATCHING DISBINPROCESS")
                if (dataCoreRaya.length == 0) return sendAlert(`NO NEED JOB DISBINPROCESS !!!`, "PATCHING DISBINPROCESS");
            }
            
            dataOch.forEach(itemOch => {
                const found = dataCoreRaya.some(itemCoreRaya => itemCoreRaya.NIK == itemOch.pan_national_id);
                if (!found) {
                    dataNotInCore.push(dataOch);
                }

                dataCoreRaya.forEach(itemCoreRaya => {
                    if (itemCoreRaya.NIK === itemOch.pan_national_id) {
                        itemCoreRaya.application_id = itemOch.application_id;
                        itemCoreRaya.r_mod_id = itemOch.r_mod_id;
                        itemCoreRaya.application_status = itemOch.application_status;
                    }
                });
            });

            const grouped = dataCoreRaya.reduce((acc, obj) => {
                const key = obj.NIK + "_" + (obj.product_type);
                if (!acc[key]) {
                    acc[key] = [];
                }

                acc[key].push(obj);
                return acc;
            }, {});
            
            for (let key in grouped) {
                const group = grouped[key];
                const flag = group[0].product_type;

                if (group.length > 1) {
                    if (flag === "PNANG") {
                        flMultiple.push(group);
                    } else if (flag === "PLNEW") {
                        dtMultiple.push(group);
                    }
                } else {
                    if (flag === "PNANG") {
                        fl.push(group);
                    } else if (flag === "PLNEW") {
                        dt.push(group);
                    }
                }
            }
            
            if (fl.length > 0) await singleGroup(fl,db_och, db_lcl, "FLEXI")
            if (dt.length > 0) await singleGroup(dt,db_och, db_lcl, "DANA TALANGAN")


            // if (dataNotInCore.length > 0) await rollBackDocumentSigned(dataNotInCore)
            // if (flMultiple.length > 0) await patchLoanPaidFlexi(flMultiple)
            // if (dtMultiple.length > 0) await patchLoanPaidDt(dtMultiple)
                
            await db_och.query('COMMIT');
            await db_lcl.query('COMMIT');
        } catch (error) {
            await db_och.query('ROLLBACK');
            await db_lcl.query('ROLLBACK');
            logger.error(`[Get alert message from DISBINPROCESSController: ${error}]`)
            return sendAlert(`ERROR JOB DISBINPROCESS !!!`, "PATCHING DISBINPROCESS")
        }
    }   
}





async function rollBackDocumentSigned() {
 // DOCUMENT SIGNED
}
async function patchLoanPaidDt() {}
async function patchLoanPaidFlexi() {}

module.exports = DISBINPROCESSController





