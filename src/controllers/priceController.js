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

module.exports = { createPriceList };