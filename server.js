require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./swagger");

const webhookRoutes = require("./routes/webhook");
const requestRoutes = require("./routes/requests");

const app = express();

app.use(express.json());

app.use("/webhook", webhookRoutes);
app.use("/requests", requestRoutes);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.get("/", (req, res) => {
    res.send("Visitor Management System Running");
});

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "VMS Backend Running"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
