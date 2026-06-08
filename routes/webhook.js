const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
    console.log("Webhook Received");
    console.log(req.body);

    res.sendStatus(200);
});

module.exports = router;