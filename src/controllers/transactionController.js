const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllTransaction = async (req, res) => {
  try {
    const type = req.query.type;

    const data = await prisma.transaction.findMany({
      where: {
        transaction_type: type,
      },
      include: {
        supplier: true,
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
      customer_name,
      supplier_id,
      transaction_date,
      tax_rate,
      username,
      transaction_detail,
    } = req.body;

    // Validasi tipe transaksi
    if (transaction_type === "penjualan" && !customer_name) {
      return res.status(400).json({
        message: "Customer name is required for sales transactions.",
      });
    }
    if (transaction_type === "pembelian" && !supplier_id) {
      return res.status(400).json({
        message: "Supplier ID is required for purchase transactions.",
      });
    }

    // **Buat transaksi tanpa menentukan ID (otomatis dari sequence)**
    const newTransaction = await prisma.transaction.create({
      data: {
        transaction_type,
        customer_name: transaction_type === "penjualan" ? customer_name : null,
        supplier_id: transaction_type === "pembelian" ? supplier_id : null,
        transaction_date: new Date(transaction_date),
        tax_rate,
        username,
      },
    });

    // **Ambil transaction_id yang baru dibuat**
    const transactionId = newTransaction.id;

    // **Buat transaction_detail tanpa menentukan ID (otomatis dari sequence)**
    const detailsData = await Promise.all(
      transaction_detail.map(async (item) => {
        const priceList = await prisma.price_list.findFirst({
          where: {
            product_id: item.product_id,
            uom_id: item.uom_id,
          },
        });

        if (!priceList) {
          throw new Error(
            `Price not found for product_id: ${item.product_id} and uom_id: ${item.uom_id}`
          );
        }

        const price = parseFloat(priceList.price);
        const amount = item.quantity * price;

        return {
          transaction_id: transactionId,
          product_id: item.product_id,
          uom_id: item.uom_id,
          quantity: item.quantity,
          price,
          amount,
        };
      })
    );

    // Simpan semua transaction_detail
    await prisma.transaction_detail.createMany({
      data: detailsData,
    });

    res.status(201).json({
      message: "Transaction created successfully",
      data: {
        transaction: newTransaction,
        transaction_detail: detailsData,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
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
            uom: true,
          },
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

    // const getProductId = await prisma.transaction_detail.findMany({
    //   where: {
    //     id : parseId,
    //   },
    //   select: {
    //     product_id: true
    //   }
    // })

    // const data = await prisma.transaction_detail.findMany({
    //   where: {
    //     id : parseId,
    //   },
    //   include: {
    //     product: {
    //       select: {
    //         product_name: true,
    //         description: true
    //       }
    //     },
    //     uom: {
    //       select: {
    //         name: true,
    //         price_list: {
    //           where: {
    //             product_id: getProductId[0].product_id
    //           }
    //         }
    //       }
    //     },
    //     transaction: true
    //   }
    // });

    const data = await prisma.transaction.findFirst({
      where: {
        id: parseId,
      },
      include: {
        transaction_detail: {
          include: {
            product: true,
            uom: true,
          },
        },
        supplier: true,
      },
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
  getTransactionDetail,
};
