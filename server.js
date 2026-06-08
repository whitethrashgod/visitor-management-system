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
