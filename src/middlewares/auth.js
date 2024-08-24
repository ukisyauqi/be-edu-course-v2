import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../constants.js"

export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1] // Format token: "Bearer <token>"

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." })
    }

    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded 
    next() // Lanjutkan ke middleware berikutnya atau ke route handler
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." })
  }
}
