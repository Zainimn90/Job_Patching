const logger = require("../logger/logger")
const { getCpitNull, insertCpitNull, updateCpit, getCpitByAppId } = require("../query/och/getCpitNull")
const cifService = require("./CifService")
const sacaService = require("./SacaRayaService")

class CPITnull {
    static async getJobCPITnull(db_och) {
        try {
            logger.info("[Run Service getJobCPITnull || OCH]")
            const { rows } = await db_och.query(getCpitNull)

            return rows
        } catch (error) {
            logger.error(`[Run Service getJobCPITnull || OCH: ${error}]`)
            return false
        }
    }

    static async jobCPITnull(db_och) {
        try {
            logger.info("[Run Service jobCPITnull || OCH]")

            const { rows } = await db_och.query(getCpitNull)
            if (rows.length < 1) return rows

            await run(db_och.query(insertCpitNull))

            for (let i = 0; i < rows.length; i++) {
                let bnakCode = rows[i].bank_code

                const { dataCif } = await cifService.getCif(rows[i].legacy_cif, bnakCode, db_och)

                const appid = rows[i].application_id
                const nama = dataCif.nama.replace(/'/g,"''")
                const gender = dataCif.sex
                const dob = `${dataCif.birthDate.replace(/(\d{2})(\d{2})(\d{4})/, "$1-$2-$3")} 00:00:00.000`;
                const address = `${dataCif.address.replace(/'/g,"''")} RT.${dataCif.addressRT} / RW.${dataCif.addressRW}, KEL.${dataCif.kelurahan.replace(/'/g,"''")}, KEC.${dataCif.kecamatan.replace(/'/g,"''")}, ${dataCif.city.replace(/'/g,"''")}, ${dataCif.province.replace(/'/g,"''")}|null|null|null|null|${dataCif.zipCode}`
                const pob = dataCif.placeOfBirth.replace(/'/g,"''")

                const { data } = await sacaService.getSacaRaya(rows[i].payroll_acc_num, bnakCode, db_och)

                const avaliableBalance = data.avaliableBalance

                await run(db_update.query(updateCpit(nama, gender, dob, pob, address, appid, avaliableBalance)))
            }

            return rows
        } catch (error) {
            await db_och.query('ROLLBACK');
            logger.error(`[Run Service jobCPITnull || OCH: ${error}]`)
            return false
        }
    }

    static async getCPIT(db_och, appId) {
        try {
            logger.info("[Run Service getCPIT || OCH]")
            const { rows } = await db_och.query(getCpitByAppId(appId))

            return rows
        } catch (error) {
            await db_och.query('ROLLBACK');
            logger.error(`[Run Service getCPIT || OCH: ${error}]`)
            return false
        }
    }
}

module.exports = CPITnull
