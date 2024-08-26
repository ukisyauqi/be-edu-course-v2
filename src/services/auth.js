import bcrypt from "bcrypt"
import prisma from "../db.js"
import jwt from "jsonwebtoken"
import { JWT_SECRET, NODEMAILER_EMAIL, NODEMAILER_PASS } from "../constants.js"
import { v4 as uuidv4 } from "uuid"
import nodemailer from "nodemailer"

export async function register(fullname, username, password, email) {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (user && !user.verificationToken) {
    throw new Error("User already registered")
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const verificationToken = uuidv4()

  await prisma.user.create({
    data: {
      fullname,
      username,
      password: hashedPassword,
      email,
      verificationToken,
    },
  })

  await sendVerificationEmail(email, verificationToken)
  return { success: true, message: "Email Verification Sended" }
}

async function sendVerificationEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: NODEMAILER_EMAIL,
      pass: NODEMAILER_PASS,
    },
  })

  const mailOptions = {
    from: "msyauqifadhlika@gmail.com",
    to: [email],
    subject: "Email Verification",
    text: `Please verify your email by clicking the following link: 
    http://localhost:8080/verify-email?token=${token}`,
  }

  try {
    console.log("sending email...")
    await transporter.sendMail(mailOptions)
    console.log("Verification email sent to " + email)
  } catch (error) {
    console.error("Error sending verification email: ", error)
  }
}

export async function verifyEmail(token) {
  const user = await prisma.user.findFirst({
    where: { verificationToken: token },
  })

  if (!user) {
    throw new Error("Invalid Verification Token")
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { verificationToken: null },
  })
  return { success: true, message: "Email Verified Successfully" }
}

export async function login(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw new Error("User not found")
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error("Invalid password")
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1h" } // Token berlaku selama 1 jam
  )

  return { token, user }
}
