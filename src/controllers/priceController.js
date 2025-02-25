const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPriceList = async (req, res) => {
  try {
    const { product_id, uom_id, price } = req.body;
    const data = await prisma.price_list.create({
      data: {
        product_id,
        uom_id,
        price,
      },
    });
    res.status(201).json({ message: "success create price list", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllPriceList = async (req, res) => {
  try {
    const data = await prisma.price_list.findMany({
      include: {
        product: true,
        uom: true,
      }
    });
    res.status(200).json({ message: "success get all price list", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePriceList = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, uom_id, price } = req.body;
    const parseId = parseInt(id);
    const data = await prisma.price_list.update({
      where: {
        price_list_id: parseId,
      },
      data: {
        product_id,
        uom_id,
        price,
      },
    });
    res.status(201).json({ message: "success update price list", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePriceList = async (req, res) => {
  try {
    const { id } = req.params;
    const parseId = parseInt(id);
    const data = await prisma.price_list.delete({
      where: {
        price_list_id: parseId,
      },
    });
    res.status(201).json({ message: "success delete price list", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createPriceList, getAllPriceList, updatePriceList, deletePriceList };