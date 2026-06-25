const residentRepository =
    require("../repositories/residentRepository");

const visitorRepository =
    require("../repositories/visitorRepository");

const requestRepository =
    require("../repositories/requestRepository");

class VisitorRequestService {

    constructor() {

        this.sessions = {};
    }

    async processMessage(sender, text) {

        if (!this.sessions[sender]) {

            this.sessions[sender] = {
                step: "NAME"
            };

            return "Welcome to ABC Housing Society.\nWhat is your name?";
        }

        const session = this.sessions[sender];

        if (session.step === "NAME") {

            session.name = text;
            session.step = "FLAT";

            return "Please enter flat number.";
        }

        if (session.step === "FLAT") {

            const resident =
                await residentRepository.getResidentByFlat(text);

            if (!resident) {

                return "Flat not found.";
            }
        const visitorId =
            await visitorRepository.createVisitor(
                session.name
            );

            await requestRepository.createRequest(
                visitorId,
                resident.id
            );

            delete this.sessions[sender];

            return "Visitor request submitted successfully.";
        }
    }
}

module.exports = new VisitorRequestService();
