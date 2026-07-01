const residentRepository = require("../repositories/residentRepository");

const visitorRepository = require("../repositories/visitorRepository");

const requestRepository = require("../repositories/requestRepository");

class visitorRequestService {
    constructor() {
        this.sessions = {};
    }

    async processMessage(sender, text) {
        text = text.trim().toLowerCase();
        // Cancel
        if (text === "cancel") {
            delete this.sessions[sender];
            return "Conversation cancelled. Type HI to start again.";
        }
        // Start new conversation
        if (text === "hi" || text === "hello" || text === "start") {
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
        const visitorId = await visitorRepository.createVisitor(
                session.name
            );

            await requestRepository.createRequest(
                visitorId,
                resident.id
            );

            delete this.sessions[sender];
            return "Visitor request submitted successfully.\n\nType HI to create another request.";
        }
    }
}
module.exports = new visitorRequestService();
