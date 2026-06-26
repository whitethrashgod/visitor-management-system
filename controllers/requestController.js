const visitorRequestService =
require("../services/visitorRequestService");

class RequestController {

    async getAllRequests(
        req,
        res
    ) {

        try {

            const requests =
                await visitorRequestService
                    .getAllRequests();

            res.json(requests);

        }
        catch(err) {

            console.error(err);

            res.status(500).json({
                message: "Server error"
            });

        }

    }

}

module.exports =
new RequestController();
