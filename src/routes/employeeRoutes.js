const express = require("express");
const router = express.Router();

const {
  getAllEmployee,
  createEmployee,
} = require("../controllers/employeeControllers");

router.get('/employees', getAllEmployee);
router.post('/employee', createEmployee)

module.exports = router;
