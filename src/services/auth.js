import bcrypt from "bcrypt"
import prisma from "../db.js"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../constants.js"


export async function register(fullname, username, password, email) {
  const hashedPassword = await bcrypt.hash(password, 10)
  
  const user = await prisma.user.create({
    data: {
      fullname,
      username,
      password: hashedPassword,
      email,
    },
  })
  return user
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
