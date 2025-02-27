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

// ----------------------------------------------------------------------------

const createUserRole = async (req, res) => {
  try {
    const { username, role } = req.body;
    const data = await prisma.fw_user_role.create({
      data: {
        username,
        role,
        status: "A",
      },
    });
    res.status(201).json({ message: "success create user role", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ----------------------------------------------------------------------------

const getUserRole = async (req, res) => {
  try {
    const getUserRole = await prisma.fw_user_role.findMany({
      where: {
        status: "A",
      },
    });
    res
      .status(200)
      .json({ message: "success get user role", data: getUserRole });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// -----------------------------------------------------------------------------

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, role } = req.body;
    const parseId = parseInt(id);

    const updateUserRole = await prisma.fw_user_role.update({
      where: {
        role_id: parseId,
      },
      data: {
        username,
        role,
      },
    });

    res
      .status(200)
      .json({ message: "Successfully create user role", data: updateUserRole });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ---------------------------------------------------------------------------------------------

const deleteUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const parseId = parseInt(id);

    const deleteUser = await prisma.fw_user_role.update({
      where: {
        role_id: parseId,
      },
      data: {
        status: "D",
      },
    });
  } catch (error) {}
};

module.exports = {
  createUserRole,
  getUserRole,
  getAllEmployee,
  updateUserRole,
  deleteUserRole
};
