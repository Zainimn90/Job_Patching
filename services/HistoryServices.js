// const request = require("../../connection/config_local")
const logger = require("../logger/logger")
const { 
  insertHistory 
} = require("../query/local/history")

class historyServices {
  static async insertHistory(actionProcess, before, after, tableName, executeBy, level, request) {
    try {
      logger.info("[Run Service insertHistory || LOCAL]")
      const {rows} = await request.query(insertHistory,[actionProcess, before, after, tableName, executeBy, level])
      return rows
    } catch (error) {
      logger.error(`[Run Service insertHistory || LOCAL: ${error}]`)
      request.query('ROLLBACK')
      return { err: error }
    }
  }
}

module.exports = historyServices
