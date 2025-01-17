const logger = require("../logger/logger")
const { getCpitNull, insertCpitNull, updateCpit } = require("../query/och/getCpitNull")

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

    static async jobCPITnull() {
        try {
            logger.info("[Run Service getJobCPITnull || OCH]")

            let rowsCif = []
            const { rows } = await run(db.query(getCpitNull))
            
            if (rows.length < 1) return rows
            for (let i = 0; i < rows.length; i++) {
                rowsCif.push(rows[i].application_id)
            }

            const text = rowsCif.join(', ');
            await fs.writeFile('appid.txt', text);

            await run(db_update.query(insertCpitNull))

            for (let i = 0; i < rows.length; i++) {
                let bnakCode = rows[i].bank_code

                const { dataCif } = await cifService.getCif(rows[i].legacy_cif, bnakCode)

                const appid = rows[i].application_id
                const nama = dataCif.nama.replace(/'/g,"''")
                const gender = dataCif.sex
                const dob = `${dataCif.birthDate.replace(/(\d{2})(\d{2})(\d{4})/, "$1-$2-$3")} 00:00:00.000`;
                const address = `${dataCif.address.replace(/'/g,"''")} RT.${dataCif.addressRT} / RW.${dataCif.addressRW}, KEL.${dataCif.kelurahan.replace(/'/g,"''")}, KEC.${dataCif.kecamatan.replace(/'/g,"''")}, ${dataCif.city.replace(/'/g,"''")}, ${dataCif.province.replace(/'/g,"''")}|null|null|null|null|${dataCif.zipCode}`
                const pob = dataCif.placeOfBirth.replace(/'/g,"''")

                const { data } = await sacaService.getSacaRaya(rows[i].payroll_acc_num, bnakCode)

                const avaliableBalance = data.avaliableBalance

                await run(db_update.query(updateCpit(nama, gender, dob, pob, address, appid, avaliableBalance)))
            }

            logger.info("[Done Job CPITnull || OCH]")

            return rows
        } catch (error) {
            logger.error(`[Run Service getJobCPITnull || OCH: ${error}]`)
            return false
        }
    }
}

module.exports = CPITnull
