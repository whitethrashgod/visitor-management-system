const express = require("express");

const router = express.Router();

const webhookController =
    require("../controllers/webhookController");

const VERIFY_TOKEN = "vms_token";

/**
 * @swagger
 * /webhook:
 *   get:
 *     summary: Verify Meta webhook
 *     description: Used by Meta to verify the webhook during setup.
 *     parameters:
 *       - in: query
 *         name: hub.mode
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: hub.verify_token
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: hub.challenge
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Verification successful.
 *       403:
 *         description: Verification failed.
 */
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


/**
 * @swagger
 * /webhook:
 *   post:
 *     summary: Receive WhatsApp messages
 *     responses:
 *       200:
 *         description: Webhook received
 */
router.post("/", webhookController.handleWebhook);

module.exports = router;
