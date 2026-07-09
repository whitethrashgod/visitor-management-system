const sql = require("mssql");
const { config } = require("../database/db");

class ResidentRepository {

    async getResidentByFlat(flatNumber) {

        await sql.connect(config);

        const result = await sql.query`
            SELECT *
            FROM residents
            WHERE flat_number = ${flatNumber}
        `;

        return result.recordset[0];
    }
    async getResidentByPhone(phone) {

    await sql.connect(config);

    const result = await sql.query`
        SELECT *
        FROM residents
        WHERE phone_number = ${phone}
    `;

    return result.recordset[0];
    }
}

module.exports = new ResidentRepository();
