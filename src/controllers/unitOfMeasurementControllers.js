const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUOM = async (req, res) => {
  try {
    const data = await prisma.master_uom.findMany();
    res.status(200).json({ message: "success get all UOM", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ---------------------------------------------------------------------------------------------

const createUOM = async (req, res) => {
  try {
    const { name, rate_conversion } = req.body;

    // check if name and rate_conversion are provided
    if (!name || !rate_conversion) {
      return res
        .status(400)
        .json({ message: "name and rate_conversion are required" });
    }

    const checkUOM = await prisma.master_uom.findFirst({
      where: {
        name,
      },
    });

    // check if a UOM with the same name already exists
    if (checkUOM) {
      return res.status(400).json({ message: "UOM already exists" });
    }

    const data = await prisma.master_uom.create({
      data: {
        name,
        rate_conversion,
      },
    });

    res.status(201).json({ message: "success create UOM", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ---------------------------------------------------------------------------------------------

const updateUOM = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rate_conversion } = req.body;

    // check if name and rate_conversion are provided
    if (!name || !rate_conversion) {
      return res
        .status(400)
        .json({ message: "name and rate_conversion are required" });
    }

    // check if a UOM with the same name already exists
    const checkUOM = await prisma.master_uom.findFirst({
      where: {
        name,
      },
    });

    if (checkUOM) {
      return res.status(400).json({ message: "UOM already exists" });
    }

    const parseId = parseInt(id);
    const data = await prisma.master_uom.update({
      where: {
        id: parseId,
      },
      data: {
        name,
        rate_conversion,
      },
    });
    res.status(201).json({ message: "success update UOM", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ---------------------------------------------------------------------------------------------

const deleteUOM = async (req, res) => {
  try {
    const { id } = req.params;
    const parseId = parseInt(id);
    const data = await prisma.master_uom.delete({
      where: {
        id: parseId,
      },
    });
    res.status(201).json({ message: "success delete UOM", data: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllUOM,
  createUOM,
  updateUOM,
  deleteUOM,
};
