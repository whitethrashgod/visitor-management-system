const express = require("express");

const router = express.Router();

const requests = [];

// Create Request
router.post("/", (req, res) => {

    const request = {
        id: requests.length + 1,
        visitorName: req.body.visitorName,
        unit: req.body.unit,
        status: "Pending"
    };

    requests.push(request);

    res.status(201).json(request);
});

// Get All Requests
router.get("/", (req, res) => {
    res.json(requests);
});

router.post("/:id/approve", (req, res) => {

    const request = requests.find(
        r => r.id == req.params.id
    );

    if (!request) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    request.status = "Approved";

    res.json(request);
});

router.post("/:id/deny", (req, res) => {

    const request = requests.find(
        r => r.id == req.params.id
    );

    if (!request) {
        return res.status(404).json({
            message: "Request not found"
        });
    }

    request.status = "Denied";

    res.json(request);
});
module.exports = router;
