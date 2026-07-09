const sql = require("mssql");
const { config } = require("../database/db");

class VisitorRepository {

    async createVisitor(name, phoneNumber) {

        await sql.connect(config);

        const result = await sql.query`
            INSERT INTO visitors(visitor_name, phone_number)
            OUTPUT INSERTED.id
            VALUES(${name}, ${phoneNumber})
        `;

        return result.recordset[0].id;
    }
    
    async getVisitorById(id) {

    await sql.connect(config);

    const result = await sql.query`
        SELECT *
        FROM visitors
        WHERE id = ${id}
    `;

    return result.recordset[0];
}
}

module.exports = new VisitorRepository();
