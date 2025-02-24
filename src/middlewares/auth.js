const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token:", decoded);

    req.user = decoded; 

    next();
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {authenticateToken};
