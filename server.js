require("dotenv").config();

const express = require("express");

const webhookRoutes =
    require("./routes/webhook");

const requestRoutes =
    require("./routes/requests");

const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./swagger");

const app = express();

app.use(express.json());

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use("/webhook", webhookRoutes);

app.use("/requests", requestRoutes);

app.get("/", (req, res) => {
    res.send(
        "Visitor Management System Running"
    );
});

app.get("/health", (req, res) => {
    res.json({
        status: "OK"
    });
});

app.listen(3000, () => {
    console.log(
        "Server running on port 3000"
    );
});
