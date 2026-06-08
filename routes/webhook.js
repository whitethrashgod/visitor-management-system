const express = require("express");
const router = express.Router();

const VERIFY_TOKEN = "vms_token";

router.get("/", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (
        mode === "subscribe" &&
        token === VERIFY_TOKEN
    ) {
        return res.status(200).send(challenge);
    }

    return res.sendStatus(403);
});

router.post("/", (req, res) => {
    console.log(
        JSON.stringify(req.body, null, 2)
    );

    res.sendStatus(200);
});

module.exports = router;