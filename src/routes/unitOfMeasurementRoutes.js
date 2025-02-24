const express = require("express");
const router = express.Router();

const {
  getAllUOM,
  createUOM,
  updateUOM,
  deleteUOM,
} = require("../controllers/unitOfMeasurementControllers");

router.get("/uoms", getAllUOM);
router.post("/uoms", createUOM);
router.put("/uoms/:id", updateUOM);
router.delete("/uoms/:id", deleteUOM);

module.exports = router;
