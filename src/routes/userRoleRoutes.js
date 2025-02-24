const express = require("express");
const router = express.Router();

const {
  createRole,
  createUserRole,
} = require("../controllers/userRoleController");

router.post("/roles", createRole);
router.post("/user-roles", createUserRole);

module.exports = router;