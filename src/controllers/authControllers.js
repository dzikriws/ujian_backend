const { PrismaClient } = require("@prisma/client");
// const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const crypto = require("crypto");

const hashPasswordMD5 = (password) => {
  return crypto.createHash("md5").update(password).digest("hex");
};

const registerUser = async (req, res) => {
  try {
    const { id, username, email, password } = req.body;

    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ message: "Email, Username, and password are required" });
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
        OR: [{ username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Name, Username already exists" });
    }

    //hashing password before save
    const hashPasswordMD5 = (password) => {
      return crypto.createHash("md5").update(password).digest("hex");
    };

    const hashedPassword = hashPasswordMD5(password);

    //create new user
    const user = await prisma.master_user.create({
      data: {
        id,
        username,
        email,
        hash_password: hashedPassword,
        status: "A",
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

    const user = await prisma.master_user.findFirst({
      where: { username },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Username or password is incorrect" });
    }

    const isPasswordValid = hashPasswordMD5(password) === user.hash_password;

    if (!isPasswordValid) {
      return res
        .status(404)
        .json({ message: "Username or password is incorrect" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

module.exports = { registerUser, loginUser };
