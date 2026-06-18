const express = require("express");
const router = express.Router();
const { sendMessage } = require("../services/whatsappService");

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

router.post("/", async (req, res) => {

    console.log("===== WEBHOOK HIT =====");
    console.log("BODY:", JSON.stringify(req.body, null, 2));

    try {

        const message =
            req.body.entry?.[0]
                ?.changes?.[0]
                ?.value?.messages?.[0];

        console.log("MESSAGE OBJECT:", message);

        if (message) {

            const sender = message.from;
            const text = message.text?.body;

            console.log("From:", sender);
            console.log("Message:", text);

            await sendMessage(
                sender,
                "Welcome to ABC Housing Society!"
            );
        }

        res.sendStatus(200);

    } catch (err) {
        console.error("ERROR:", err);
        res.sendStatus(500);
    }
});

module.exports = router;

