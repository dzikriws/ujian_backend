const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllProduct = async (req, res) => {
  try {
    const data = await prisma.master_product.findMany({});
    res.status(200).json({ message: "success get all product", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { product_name, description } = req.body;
    const data = await prisma.master_product.create({
      data: {
        product_name,
        description,
        status: "A",
      },
    });
    res.status(201).json({ message: "success create product", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_name, description } = req.body;
    const data = await prisma.master_product.update({
      where: {
        id,
      },
      data: {
        product_name,
        description,
      },
    });
    res.status(201).json({ message: "success update product", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSupplierProduct = await prisma.master_product.update({
      where: {
        id,
      },
      data: {
        status: "D",
      },
    });

    if (!deleteSupplierProduct) {
      return res.status(404).json({ message: "product not found" });
    }
    res
      .status(201)
      .json({ message: "success delete product", data: deleteSupplierProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
