const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllSupplier = async (req, res) => {
  try {
    const data = await prisma.master_supplier.findMany();
    res.status(200).json({ message: "success get all user", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createSupplier = async (req, res) => {
  try {
    const userId = req.user.id;
    const { contact_person, phone, email, address } = req.body;

    if (!contact_person || !phone || !email || !address) {
      return res
        .status(400)
        .json({ message: "contact person, phone, email, and address are required" });
    }

    if (!userId) {
      return res.status(400).json({ message: "you must login first" });
    }

    const data = await prisma.master_supplier.create({
      data: {
        seller_id: userId,
        contact_person,
        phone,
        email,
        address,
      },
    });
    res.status(200).json({
      message: "success create supplier",
      data: data,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllSupplier,
  createSupplier,
};  