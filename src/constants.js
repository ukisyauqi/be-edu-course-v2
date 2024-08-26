import dotenv from "dotenv"

dotenv.config()

export const JWT_SECRET = process.env.JWT_SECRET
export const SERVER_PORT = process.env.SERVER_PORT
export const NODEMAILER_EMAIL = process.env.NODEMAILER_EMAIL
export const NODEMAILER_PASS = process.env.NODEMAILER_PASS
