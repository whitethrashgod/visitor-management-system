const express = require("express");

const router = express.Router();

const db = require("../database/db");

// Create Request
router.post("/", async (req, res) => {

    try {

        const { visitorName, unit } = req.body;

        const [visitorResult] = await db.query(
            `
            INSERT INTO visitors (visitor_name)
            VALUES (?)
            `,
            [visitorName]
        );

        const visitorId = visitorResult.insertId;

        const [residentRows] = await db.query(
            `
            SELECT id
            FROM residents
            WHERE flat_number = ?
            `,
            [unit]
        );

        if (residentRows.length === 0) {
            return res.status(404).json({
                message: "Flat not found"
            });
        }

        const residentId = residentRows[0].id;

        await db.query(
            `
            INSERT INTO visitor_requests
            (visitor_id,resident_id,guard_id,status)
            VALUES (?,?,?,?)
            `,
            [
                visitorId,
                residentId,
                1,
                "PENDING"
            ]
        );

        res.status(201).json({
            message: "Request created"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }
});

// Get All Requests
router.get("/", async (req, res) => {

    try {

        const [rows] = await db.query(`
            SELECT
                vr.id,
                v.visitor_name,
                r.flat_number,
                vr.status
            FROM visitor_requests vr
            JOIN visitors v
                ON vr.visitor_id = v.id
            JOIN residents r
                ON vr.resident_id = r.id
        `);

        res.json(rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }
});

router.post("/:id/approve", async (req, res) => {

    try {

        const [result] = await db.query(
            `
            UPDATE visitor_requests
            SET status = 'APPROVED'
            WHERE id = ?
            `,
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        res.json({
            message: "Request approved"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});

router.post("/:id/deny", async (req, res) => {

    try {

        const [result] = await db.query(
            `
            UPDATE visitor_requests
            SET status = 'REJECTED'
            WHERE id = ?
            `,
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        res.json({
            message: "Request rejected"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});

module.exports = router;
