const sql = require('mssql')
const db_core_raya = {
    user: process.env.DB_USER_CORE_RAYA,
    password: process.env.DB_PASSWORD_CORE_RAYA,
    database: process.env.DB_NAME_CORE_RAYA,
    server: process.env.DB_HOST_CORE_RAYA,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

async function request(query) {
    let error = {}
    // for (let index = 0; index < 10; index++) {
        try {
            // console.log('try to connect');
            await sql.connect(db_core_raya)
            const data = await sql.query(query)
            
            await sql.close()
            return data.recordset
        } catch (err) {
            await sql.close()
            await sleep (5000)
            error.error = ''+err
        }
    // }
    return error
}

module.exports = request