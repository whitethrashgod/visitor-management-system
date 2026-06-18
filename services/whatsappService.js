const axios = require("axios");

async function sendMessage(to, message) {
    try {
        console.log(`https://graph.facebook.com/v23.0/${process.env.PHONE_NUMBER_ID}/messages`); 
        console.log("Sending to:", to);
        await axios.post(
            `https://graph.facebook.com/v23.0/${process.env.PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to: to,
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

        console.log("Message sent");
    }
    catch (err) {
        console.error(
            "WhatsApp Error:",
            err.response?.data || err.message
        );
    }
}

module.exports = {
    sendMessage
};
