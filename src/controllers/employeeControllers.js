const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllEmployee = async (req, res) => {
  try {
    const data = await prisma.fw_user_role.findMany();
    res.status(200).json({ message: "success get all user", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await prisma.fw_user_role.create({
      data: {
        username,
        password,
      },
    });
    res.status(201).json({ message: "success create user", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllEmployee, createEmployee };
