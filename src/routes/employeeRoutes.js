const express = require("express");
const router = express.Router();

const {
  getAllEmployee,
  createUserRole,
  getUserRole,
  updateUserRole,
  deleteUserRole,
} = require("../controllers/employeeControllers");

router.get("/employees", getAllEmployee);
router.post("/employees", createUserRole);
router.put("/employees/:id", updateUserRole);
router.delete("/employees/:id", deleteUserRole);

module.exports = router;
