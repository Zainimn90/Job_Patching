const axios = require("axios");
const logger = require("../logger/logger")

class SacaRayaService {
  static async getSacaRaya(norek, bankCode, db_och) {
    try {
      logger.info("[Run Service getSacaRaya || SACA DETAIL]");

      let { data } = await axios.post( process.env.SACA_DETAIL_HOST, {
        "branch" : "7957",
        "accountNumber" : norek,
        "requestBy" : "SAHABAT",
        "userId" : "9997891",
        "bankCode": bankCode,
        "productCode":bankCode
      })

      return { data: data.body, err: null };
    } catch (err) {
      await db_och.query('ROLLBACK');
      logger.error(`[Failed to get data from getSacaRaya: ${err}]`);
      return { data: null, err };
    }
  }
}

module.exports = SacaRayaService;
