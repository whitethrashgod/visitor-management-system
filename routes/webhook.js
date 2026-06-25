const express = require("express");

const router = express.Router();

const webhookController =
    require("../controllers/webhookController");

const VERIFY_TOKEN = "vms_token";

router.get("/", (req, res) => {

    const mode = req.query["hub.mode"];
    const token =
        req.query["hub.verify_token"];
    const challenge =
        req.query["hub.challenge"];

    if (
        mode === "subscribe" &&
        token === VERIFY_TOKEN
    ) {

        return res
            .status(200)
            .send(challenge);
    }

    return res.sendStatus(403);
});

router.post(
    "/",
    webhookController.handleWebhook
);

module.exports = router;
