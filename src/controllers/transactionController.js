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
    const {
      transaction_type,
      supplier_id,
      customer_name,
      tax_rate,
      username,
      product_id,
      uom_id,
      quantity,
      price
    } = req.body;

    if (!transaction_type || !supplier_id || !customer_name || !tax_rate || !username) {
      return res
        .status(400)
        .json({ message: "All fields are required" });
    }

    const amount = quantity * price;

    const createTransaction = await prisma.transaction.create({
      data: {
        transaction_type: transaction_type,
        supplier_id: supplier_id,
        customer_name: customer_name,
        transaction_date: Date.now(),
        tax_rate
      },
    });

    const createTransactionDetail = await prisma.transaction_detail.create({
      data: {
        transaction_id: createTransaction.id,
        product_id: product_id,
        uom_id: uom_id,
        quantity: quantity,
        unit_price: price,
        subtotal: amount
      },
    });


    res.status(201).json({
      message: "Success create transaction",
      transaction: createTransaction,
      transactionDetails: createTransactionDetail,
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

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const data = await prisma.transaction.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
    res.status(201).json({ message: "success update transaction", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllTransaction,
  createTransaction,
  getTransactionById,
  updateTransaction,
};
