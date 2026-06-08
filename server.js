require("dotenv").config();

const express = require("express");

const webhookRoutes = require("./routes/webhook");

const requestRoutes = require("./routes/requests");

const app = express();

app.use(express.json());

app.use("/webhook", webhookRoutes);

app.use("/requests", requestRoutes);

app.get("/", (req, res) => {
    res.send("Visitor Management System Running");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "VMS Backend Running"
    });
});

const db = require("./database/db");

app.get("/db-test", async (req, res) => {
    try {

        const [rows] = await db.query(
            "SELECT * FROM residents"
        );

        res.json(rows);

    } catch (error) {

        console.error(error);

        res.status(500).json(error.message);

    }
});
