const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllSupplier = async (req, res) => {
  try {
    const data = await prisma.master_supplier.findMany({
      include: {
        transactions: true,
      },
    });
    res.status(200).json({ message: "success get all user", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createSupplier = async (req, res) => {
  try {
    const { contact_person, phone, email, address } = req.body;

    if (!contact_person || !phone || !email || !address) {
      return res
        .status(400)
        .json({
          message: "contact person, phone, email, and address are required",
        });
    }

    const checkingSupplier = await prisma.master_supplier.findFirst({
      where: {
        contact_person,
        phone,
        email,
      },
    });

    if (checkingSupplier) {
      return res.status(400).json({ message: "supplier already exists" });
    }

    const data = await prisma.master_supplier.create({
      data: {
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

const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { contact_person, phone, email, address } = req.body;
    const data = await prisma.master_supplier.update({
      where: {
        id,
      },
      data: {
        contact_person,
        phone,
        email,
        address,
      },
    });
    res.status(200).json({ message: "success update supplier", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.master_supplier.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "success delete supplier", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
