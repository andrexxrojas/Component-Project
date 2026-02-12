import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  // Get the token from cookies instead of Authorization header
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
