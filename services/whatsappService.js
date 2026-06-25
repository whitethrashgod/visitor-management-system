const axios = require("axios");

class WhatsAppService {

    async sendMessage(to, message) {

        try {

            await axios.post(
                `https://graph.facebook.com/v23.0/${process.env.PHONE_NUMBER_ID}/messages`,
                {
                    messaging_product: "whatsapp",
                    to,
                    text: {
                        body: message
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log(`Message sent to ${to}`);

        } catch (err) {

            console.error(
                "WhatsApp Error:",
                err.response?.data || err.message
            );
        }
    }
}

module.exports = new WhatsAppService();
