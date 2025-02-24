const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllTransaction = async (req, res) => {
    try {
        const data = await prisma.transaction.findMany({
            include: {
                transaction_detail: true,
            },
        });
        res.status(200).json({ message: "success get all transaction", data: data });
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