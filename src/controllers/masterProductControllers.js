const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllProduct = async (req, res) => {
  try {
    const data = await prisma.master_product.findMany({
      include: {
        supplier: true,
        uom: true,
      },
    });
    res.status(200).json({ message: "success get all product", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const supplier_id = req.user.seller_id;
    const { name, description, sku, category, price, uom_id } = req.body;
    const data = await prisma.master_product.create({
      data: {
        supplier_id,
        name,
        description,
        sku,
        category,
        price,
        uom_id,
      },
    });
    res.status(200).json({ message: "success create product", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, sku, category, price, uomId } = req.body;
    const data = await prisma.master_product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        sku,
        category,
        price,
        uomId,
      },
    });
    res.status(200).json({ message: "success update product", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSupplierProduct = await prisma.master_product.delete({
      where: {
        id,
      },
    });

    if (!deleteSupplierProduct) {
      return res.status(404).json({ message: "product not found" });
    }
    res
      .status(200)
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
