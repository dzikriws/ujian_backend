const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllTransaction = async (req, res) => {
  try {
    const data = await prisma.transaction.findMany({
      include: {
        details: true,
      },
    });
    res
      .status(200)
      .json({ message: "success get all transaction", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getIndividualTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await prisma.transaction.findUnique({
      where: {
        buyer_id: userId,
      },
      include: {
        transaction_detail: true,
      },
    });
    res.status(200).json({ message: "success get transaction", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const buyProduct = async (req, res) => {
  try {
    const buyerId = req.user.id;
    const { product_id, quantity } = req.body;

    const findProduct = await prisma.master_product.findUnique({
      where: {
        id: product_id,
      },
      include: {
        supplier: true,
        uom: true,
      },
    });

    if (!findProduct) {
      return res.status(404).json({ message: "product not found" });
    }
    console.log(findProduct);
    console.log(buyerId);

    const totalAmount = findProduct.price * quantity;
    console.log(totalAmount);

    const data = await prisma.transaction.create({
      data: {
        supplier_id: findProduct.supplier.id,
        buyer_id: buyerId,
        totalAmount,
        status: "pending",
      },
    });

    await prisma.transaction_detail.createMany({
      data: [
        {
          transaction_id: data.id,
          product_id: product_id,
          quantity,
          unit_price: findProduct.price,
          uom_id: findProduct.uom.id,
          subtotal: totalAmount,
        },
      ],
    });

    const transactionDetail = await prisma.transaction_detail.findMany({
      where: {
        transaction_id: data.id,
      },
    });

    console.log(data);
    res.status(200).json({
      message: "success buy product",
      data: {
        transaction: data,
        transaction_detail: transactionDetail,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllTransaction, getIndividualTransaction, buyProduct };
