const serviceOch = require("../services/AnomalyDISBINPROCESSOch");
const servicehistory = require("../services/HistoryServices");
const sendAlert = require("../api/telegram")

async function singleGroup(data, db_och, db_lcl, flag) {
    for (let i = 0; i < data.length; i++) {
        const appId = data[i][0].application_id
        const loanAccount = data[i][0].loan_account
        const rModId = data[i][0].r_mod_id

        let dataBefore = {
            application_id: data[i][0].application_id,
            application_status: data[i][0].application_status
        }
        
        let dataAfter = {
            application_id: data[i][0].application_id,
            application_status: ""
        }

        let dataInsertAfter = {
            db_ts: "1",
            bank_id: "01",
            application_id: appId,
            application_status: "",
            remarks: "",
            free_txt1: "NULL",
            free_txt2: "NULL",
            free_txt3: "NULL",
            free_date1: "NULL",
            free_date2: "NULL",
            del_flg: "N",
            r_mod_id: rModId,
            r_mod_time: "now()",
            r_cre_id: rModId,
            r_cre_time: "now()"
        }

        if (data[i][0].status_account == "aktif") {
            dataAfter.application_status = "LOAN_CREATED"
            dataInsertAfter.application_status = "LOAN_CREATED"
            dataInsertAfter.remarks = "Loan Created"

            const ochPatch = await serviceOch.patchLoanCreate(db_och, appId, loanAccount, dataAfter.application_status);
            if (ochPatch.err) return sendAlert(`ERROR JOB DISBINPROCESS !!!`, "PATCHING DISBINPROCESS")

            const ochInsert = await serviceOch.insertCLHT(db_och, appId, rModId, dataAfter.application_status, dataInsertAfter.remarks);
            if (ochInsert.err) return sendAlert(`ERROR JOB DISBINPROCESS !!!`, "PATCHING DISBINPROCESS")

            const lclPatch = await servicehistory.insertHistory('/job_anomaly_disburse_in_process', dataBefore, dataAfter, 'ececuser.clat', "job", 'update', db_lcl)
            if (lclPatch.err) return sendAlert(`ERROR JOB DISBINPROCESS !!!`, "PATCHING DISBINPROCESS")

            const lclInsert = await servicehistory.insertHistory('/job_anomaly_disburse_in_process', '', dataInsertAfter, 'ececuser.clht', "job", 'insert', db_lcl)
            if (lclInsert.err) return sendAlert(`ERROR JOB DISBINPROCESS !!!`, "PATCHING DISBINPROCESS")
        } else {
            sendAlert(`loan not active ${data[i][0]}`, "PATCHING DISBINPROCESS")
        }
    }

    return sendAlert(`PATCHING DISBINPROCESS ${data.length} ${flag}`, "PATCHING DISBINPROCESS")
}

module.exports = singleGroup