const axios = require("axios");
const logger = require("../logger/logger")

class SacaCifService {
  static async getCif(cifNo, bankCode) {
    try {
      logger.info("[Run Service getCif || CIF DETAIL]");

      let { data } = await axios.post( "https://pinang-bem.internal.bankraya.co.id/bem/v1/cbs/inquiryCIFNew" , {
        "branch":"0010",
        "cifNo":cifNo,
        "requestBy":"PINANG",
        "userId":"9997891",
        "bankCode": bankCode,
        "productCode": bankCode
      })

      return { dataCif: data.body, err: null };
    } catch (err) {
      logger.error(
        `[Failed to get data from getCif: ${err}]`
      );
      return { data: null, err };
    }
  }
}

module.exports = SacaCifService;
