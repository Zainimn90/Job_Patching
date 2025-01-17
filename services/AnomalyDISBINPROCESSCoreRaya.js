const logger = require("../logger/logger");
const { 
    getAnomalyDISBINPROCESS
} = require("../query/coreRaya/getAnomalyDISBINPROCESS");

class AnomalyDISBINPROCESS {
    static async getAnomalyDISBINPROCESS(db_core_raya, nik) {
        try {
            logger.info("[Run Service getNorekLessThn15 || CORE RAYA]");
            const data = await db_core_raya(getAnomalyDISBINPROCESS(nik));
            
            return data
        } catch (error) {
            await db_.query('ROLLBACK');
            logger.error(`[Run Service getNorekLessThn15 || CORE RAYA: ${error}]`);
            return {err: "Serrvices ERROR getNorekLessThn15"}
        }
    }
}

module.exports = AnomalyDISBINPROCESS;
