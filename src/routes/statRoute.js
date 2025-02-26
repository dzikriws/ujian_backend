const express = require("express");
const router = express.Router();

const { getStat } = require("../controllers/statControllers");

router.get("/stat", getStat);

module.exports = router;
