const whatsappService =
    require("../services/whatsappService");

const visitorRequestService =
    require("../services/visitorRequestService");

class WebhookController {

    async handleWebhook(req, res) {

        try {

            const message =
                req.body.entry?.[0]
                    ?.changes?.[0]
                    ?.value?.messages?.[0];

            if (message) {

                const sender = message.from;

                const text =
                    message.text?.body;

                console.log("Webhook hit!");
                console.log(sender);
                console.log(text);

                const reply =
                    await visitorRequestService
                        .processMessage(
                            sender,
                            text
                        );

                await whatsappService
                    .sendMessage(
                        sender,
                        reply
                    );
            }

            res.sendStatus(200);

        } catch (err) {

            console.error(err);

            res.sendStatus(500);
        }
    }
}

module.exports = new WebhookController();
