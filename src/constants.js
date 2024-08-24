import dotenv from "dotenv"

dotenv.config()

export const JWT_SECRET = process.env.JWT_SECRET
export const SERVER_PORT = process.env.SERVER_PORT
