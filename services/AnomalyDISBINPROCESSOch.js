const logger = require("../logger/logger");
const { 
    getAnomalyDISBINPROCESS,
    patchLoanCreate,
    insertCLHT
} = require("../query/och/getAnomalyDISBINPROCESS");

class AnomalyDISBINPROCESS {
    static async getAnomalyDISBINPROCESS(db_och) {
        try {
            logger.info("[Run Service getAnomalyDISBINPROCESS || OCH]");
            const today = new Date();
            today.setHours(today.getHours() + 7);
            const endDate = today.toISOString().replace('T', ' ').slice(0, 10);

            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            yesterday.setHours(yesterday.getHours() + 7);
            const startDate = yesterday.toISOString().replace('T', ' ').slice(0, 10);
            
            const { rows:rows } = await db_och.query(getAnomalyDISBINPROCESS(startDate, endDate));
            return rows
        } catch (error) {
            await db_och.query('ROLLBACK');
            logger.error(`[Run Service getAnomalyDISBINPROCESS || OCH: ${error}]`);
            return {err: "Serrvices ERROR getAnomalyDISBINPROCESS"}
        }
    }

    static async patchLoanCreate(db_och, appId, loanAccount, applicationStatus) {
        try {
            const { rows:rows } = await db_och.query(patchLoanCreate(appId, loanAccount, applicationStatus));
            return rows
        } catch (error) {
            await db_och.query('ROLLBACK');
            logger.error(`[Run Service patchLoanCreate || OCH: ${error}]`);
            return {err: "Serrvices ERROR patchLoanCreate"}
        }
    }

    static async insertCLHT(db_och, appId, rModId, applicationStatus, dataInsertAfterRemarks) {
        try {
            const { rows:rows } = await db_och.query(insertCLHT(appId, rModId, applicationStatus, dataInsertAfterRemarks));
            return rows
        } catch (error) {
            await db_och.query('ROLLBACK');
            logger.error(`[Run Service insertCLHT || OCH: ${error}]`);
            return {err: "Serrvices ERROR insertCLHT"}
        }
    }
}

module.exports = AnomalyDISBINPROCESS;
