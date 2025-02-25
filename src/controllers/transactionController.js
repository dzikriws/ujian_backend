const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllTransaction = async (req, res) => {
  try {
    const data = await prisma.transaction.findMany({
      include: {
        transaction_detail: true,
      }
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
      transaction_id,
      transaction_type,
      supplier_id,
      customer_name,
      tax_rate,
      username,
      product_id,
      transaction_date,
      uom_id,
      quantity,
      price,
    } = req.body;

    if (
      !transaction_type
    ) {
      return res.status(400).json({ message: "Transaction type is required" });
    }

    const amount = quantity * price;

    const createTransaction = await prisma.transaction.create({
      data: {
        id: transaction_id,
        transaction_type: transaction_type,
        supplier_id: supplier_id,
        customer_name: customer_name,
        username,
        transaction_date,
        tax_rate,
      },
    });

    const createTransactionDetail = await prisma.transaction_detail.create({
      data: {
        transaction_id: transaction_id,
        product_id: product_id,
        uom_id: uom_id,
        quantity: quantity,
        price: price,
        amount: amount,
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
    const parseIntId = parseInt(id);
    const data = await prisma.transaction.findFirst({
      where: {
        id: parseIntId,
      },
      include: {
        transaction_detail: {
          include: {
            product: true,
            uom: true
          }
        },
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

const getTransactionDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const parseId = parseInt(id);

    const getProductId = await prisma.transaction_detail.findMany({
      where: {
        id : parseId,
      },
      select: {
        product_id: true
      }
    })

    const data = await prisma.transaction_detail.findMany({
      where: {
        id : parseId,
      },
      include: {
        product: {
          select: {
            product_name: true,
            description: true
          }
        },
        uom: {
          select: {
            name: true,
            price_list: {
              where: {
                product_id: getProductId[0].product_id
              }
            }
          }
        },
        transaction: true
      }
    });
    res
      .status(200)
      .json({ message: "success get transaction detail", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllTransaction,
  createTransaction,
  getTransactionById,
  updateTransaction,
  getTransactionDetail
};
