const logger = require("../logger/logger");
const { 
    getNorekLessThn15Befor,
    getNorekLessThn15After, 
    updatNorekLessThn15
} = require("../query/och/getNorekLessThn15");

class NorekLessThn15 {
    static async getNorekLessThn15Befor(db_och, condition, limit) {
        try {
            logger.info("[Run Service getNorekLessThn15 || OCH]");
            const { rows } = await db_och.query(getNorekLessThn15Befor(condition, limit));
            return rows
        } catch (error) {
            await db_och.query('ROLLBACK');
            logger.error(`[Run Service getNorekLessThn15 || OCH: ${error}]`);
            return {err: "Serrvices ERROR getNorekLessThn15"}
        }
    }

    static async getNorekLessThn15After(db_och, condition) {
        try {
            logger.info("[Run Service getNorekLessThn15 || OCH]");
            const { rows:rows } = await db_och.query(getNorekLessThn15After(condition));
            return rows
        } catch (error) {
            await db_och.query('ROLLBACK');
            logger.error(`[Run Service getNorekLessThn15 || OCH: ${error}]`);
            return {err: "Serrvices ERROR getNorekLessThn15"}
        }
    }

    static async updateNorekLessThn15(db_och, payrollAccountNum) {
        try {
            logger.info("[Run Service updateNorekLessThn15 || OCH]");
            console.log(updatNorekLessThn15(payrollAccountNum));
            const { rows:rows } = await db_och.query(updatNorekLessThn15(payrollAccountNum));
            return rows
        } catch (error) {
            await db_och.query('ROLLBACK');
            logger.error(`[Run Service updateNorekLessThn15 || OCH: ${error}]`);
            return {err: "Serrvices ERROR updateNorekLessThn15"}
        }
    }
}

module.exports = NorekLessThn15;
