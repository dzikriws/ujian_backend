const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//doenst needed in project but it can be used in landing dashbooard
const getStat = async (req, res) => {
  try {
    //get total data
    const getTotalTransaction = await prisma.transaction.count();
    const getTotalProduct = await prisma.master_product.count();
    const getTotalSupplier = await prisma.master_supplier.count();
    const getTotalEmployee = await prisma.fw_user_role.count();

    //get oldest data

    const getOldestTransaction = await prisma.transaction.findFirst({
      orderBy: {
        transaction_date: "asc",
      },
      select: {
        transaction_date: true,
      },
      take: 1,
    });

    const getOldestProduct = await prisma.master_product.findFirst({
      orderBy: {
        created_at: "asc",
      },
      select: {
        created_at: true,
      },
      take: 1,
    });

    const getOldestSupplier = await prisma.master_supplier.findFirst({
      orderBy: {
        created_at: "asc",
      },
      select: {
        updated_at: true,
      },
      take: 1,
    });

    const getOldestEmployee = await prisma.fw_user_role.findFirst({
      orderBy: {
        ts_insert: "asc",
      },
      select: {
        ts_insert: true,
      },
      take: 1,
    });

    res.status(200).json({
      message: "success get stat",
      data: {
        transaction: {
          totalTransaction: getTotalTransaction,
          oldestTransaction: getOldestTransaction,
        },
        product: {
          totalProduct: getTotalProduct,
          oldestProduct: getOldestProduct,
        },
        supplier: {
          totalSupplier: getTotalSupplier,
          oldestSupplier: getOldestSupplier,
        },
        employee: {
          totalEmployee: getTotalEmployee,
          oldestEmployee: getOldestEmployee,
        },
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getStat };
