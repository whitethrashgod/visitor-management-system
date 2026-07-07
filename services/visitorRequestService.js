const residentRepository = require("../repositories/residentRepository");

const visitorRepository = require("../repositories/visitorRepository");

const requestRepository = require("../repositories/requestRepository");

const whatsappService = require("./whatsappService");

class visitorRequestService {
    constructor() {
        this.sessions = {};
    }

    async processMessage(sender, text) {
        text = text.trim();
        const normalizedText = text.toLowerCase();
        // Cancel
        if (normalizedText === "cancel" || normalizedText === "stop") {
            delete this.sessions[sender];
            return "Conversation cancelled. Type HI to start again.";
        }
        // Start new conversation
        if (normalizedText === "hi" || normalizedText === "hello" || normalizedText === "start") {
            this.sessions[sender] = {
                step: "NAME"
            };

            return "Welcome to ABC Housing Society.\nWhat is your name?";
        }
        // No active session
        if (!this.sessions[sender]) {
            return "Please type HI to start a new visitor request.";
        }

        const session = this.sessions[sender];

        if (session.step === "NAME") {

            session.name = text;
            session.step = "FLAT";

            return "Please enter flat number.";
        }

        if (session.step === "FLAT") {

            const resident = await residentRepository.getResidentByFlat(text);

            if (!resident) {
                return "Flat not found.";
            }

        try{
        const visitorId = await visitorRepository.createVisitor(session.name, sender);
        const requestId = await requestRepository.createRequest(visitorId, resident.id);
        await whatsappService.sendApprovalRequest(
            resident.phone_number,
            session.name,
            text
        );

            delete this.sessions[sender];
            return "Visitor request submitted successfully. Please wait for approval\n\nType HI to create another request.";
        } 
        catch (err){
            console.error(err);
            delete this.sessions[sender];
            return "Sorry, something went wrong while submitting your request. Please type HI to try again.";
        }
    }
}
}
module.exports = new visitorRequestService();
