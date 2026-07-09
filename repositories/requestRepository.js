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

    async getLatestPendingRequestByResident(residentId) {

    await sql.connect(config);

    const result = await sql.query`
        SELECT TOP 1 *
        FROM visitor_requests
        WHERE resident_id = ${residentId}
        AND status = 'PENDING'
        ORDER BY created_at DESC
    `;

    return result.recordset[0];
    }

    async updateStatus(requestId, status) {

    await sql.connect(config);

    await sql.query`
        UPDATE visitor_requests
        SET status = ${status}
        WHERE id = ${requestId}
    `;
    }
}
module.exports = new RequestRepository();
