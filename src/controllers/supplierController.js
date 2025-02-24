const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllSupplier = async (req, res) => {
  try {
    const data = await prisma.master_supplier.findMany({});
    res.status(200).json({ message: "success get all user", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createSupplier = async (req, res) => {
  try {
    const {
      suplier_name,
      address,
      city,
      country,
      payment_terms,
      bank_name,
      bank_account,
      contact_name,
      contact_phone,
      contact_email,
    } = req.body;

    if (
      !suplier_name ||
      !address ||
      !city ||
      !country ||
      !payment_terms ||
      !bank_name ||
      !bank_account ||
      !contact_name ||
      !contact_phone ||
      !contact_email
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const data = await prisma.master_supplier.create({
      data: {
        suplier_name,
        address,
        city,
        country,
        payment_terms,
        bank_name,
        bank_account,
        contact_name,
        contact_phone,
        contact_email,
        status: "A",
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
    const {
      suplier_name,
      address,
      city,
      country,
      payment_terms,
      bank_name,
      bank_account,
      contact_name,
      contact_phone,
      contact_email,
    } = req.body;
    const data = await prisma.master_supplier.update({
      where: {
        id,
      },
      data: {
        suplier_name,
        address,
        city,
        country,
        payment_terms,
        bank_name,
        bank_account,
        contact_name,
        contact_phone,
        contact_email,
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
    const data = await prisma.master_supplier.update({
      where: {
        id,
      },
      data: {
        status: "D",
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
