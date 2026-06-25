const sql = require("mssql");
const { config } = require("../database/db");

class VisitorRepository {

    async createVisitor(name) {

        await sql.connect(config);

        const result = await sql.query`
            INSERT INTO visitors(visitor_name)
            OUTPUT INSERTED.id
            VALUES(${name})
        `;

        return result.recordset[0].id;
    }
}

module.exports = new VisitorRepository();
