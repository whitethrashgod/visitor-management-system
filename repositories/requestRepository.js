const sql = require("mssql");
const { config } = require("../database/db");

class RequestRepository {

    async createRequest(visitorId, residentId) {

        await sql.connect(config);

        await sql.query`
            INSERT INTO visitor_requests
            (
                visitor_id,
                resident_id,
                status
            )
            VALUES
            (
                ${visitorId},
                ${residentId},
                'PENDING'
            )
        `;
    }
}

module.exports = new RequestRepository();
