const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllTransaction = async (req, res) => {
  try {
    const data = await prisma.transaction.findMany({
      include: {
        details: {
          include: {
            product: true,
          },
        },
        customer_or_supplier: true,
      },
    });
    res
      .status(200)
      .json({ message: "success get all transaction", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createTransaction = async (req, res) => {
  try {
    const { products, customer_or_supplier_id, type } = req.body;

    if (!products || products.length === 0 || !Array.isArray(products)) {
      return res
        .status(400)
        .json({ message: "At least one product is required" });
    }

    const productIds = products.map((item) => item.product_id);

    const findProduct = await prisma.master_product.findMany({
      where: {
        id: { in: productIds },
      },
      include: {
        uom: true,
      },
    });

    if (findProduct.length === 0) {
      return res.status(404).json({ message: "Product(s) not found" });
    }

    const totalAmount = findProduct.reduce((total, product) => {
      const productData = products.find(
        (p) => p.product_id === product.product_id
      );
      const quantity = productData ? productData.quantity : 1;
      return total + product.price * quantity;
    }, 0);

    const createTransaction = await prisma.transaction.create({
      data: {
        customer_or_supplier_id,
        type: type,
        total_amount: totalAmount,
        status: "PENDING",
      },
    });

    const transactionDetails = findProduct.map((product) => {
      const productData = products.find(
        (p) => p.product_id === product.product_id
      );
      const quantity = productData ? productData.quantity : 1;
      return {
        transaction_id: createTransaction.id,
        product_id: product.id,
        quantity: quantity,
        uom_id: product.uom_id,
        unit_price: product.price,
        subtotal: product.price * quantity,
      };
    });

    await prisma.transaction_detail.createMany({
      data: transactionDetails,
    });

    res.status(201).json({
      message: "Success create transaction",
      transaction: createTransaction,
      transactionDetails: transactionDetails,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating transaction", error: error.message });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.transaction.findUnique({
      where: {
        id: id,
      },
      include: {
        details: {
          include: {
            product: true,
          },
        },
        customer_or_supplier: true,
      },
    });
    res
      .status(200)
      .json({ message: "success get transaction by id", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllTransaction,
  createTransaction,
  getTransactionById
};
