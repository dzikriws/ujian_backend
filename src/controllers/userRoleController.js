const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const createRole = async (req, res) => {
    try {
        const {name} = req.body;
        const data = await prisma.master_role.create({
            data: {
                name,
                status: "A"
            },
        });
        res.status(201).json({message: "success create role", data: data});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

const createUserRole = async (req, res) => {
    try {
        const {username, role, ts_insert, status} = req.body;
        const data = await prisma.fw_user_role.create({
            data: {
                username,
                role,
                ts_insert,
                status
            },
        });
        res.status(201).json({message: "success create user role", data: data});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

module.exports = {createRole, createUserRole};