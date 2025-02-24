const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res
        .status(400)
        .json({ message: "Name, Username, and password are required" });
    }

    //password validation
    const passwordValidation = (password) => {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
    };

    if (!passwordValidation(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character(@$!%*?&)",
      });
    }

    //check if username and email already exists
    const existingUser = await prisma.master_user.findFirst({
      where: {
        OR: [{ name }, { username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Name, Username" });
    }

    //hashing password before save
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user
    const user = await prisma.master_user.create({
      data: {
        name,
        username,
        password: hashedPassword,
      },
    });

    //delete password from request to avoid logging it
    const sanitizedRequest = { ...req.body };
    delete sanitizedRequest.password;

    res
      .status(201)
      .json({ message: "Successfully registered new user", data: user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering new user", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await prisma.master_user.findUnique({
      where: { username },
    });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordValid) {
      return res
        .status(404)
        .json({ message: "Username or password is incorrect" });
    }

    const getSellerId = await prisma.master_supplier.findFirst({
      select:{
        id: true
      },
      where: {
        seller_id: user.id,
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        seller_id: getSellerId ? getSellerId.id : null,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // console.log(getSellerId.id)

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

module.exports = { registerUser, loginUser };
