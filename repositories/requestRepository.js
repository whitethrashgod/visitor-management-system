const sql = require("mssql");
const { config } = require("../database/db");

class RequestRepository {

    async createRequest(visitorId, residentId) {

        await sql.connect(config);
        
        const result = await sql.query`
        INSERT INTO visitor_requests
        (
            visitor_id,
            resident_id,
            status
        )
        OUTPUT INSERTED.id
        VALUES
        (
            ${visitorId},
            ${residentId},
            'PENDING'
        )
    `;
    return result.recordset[0].id;
}
}

module.exports = new RequestRepository();
