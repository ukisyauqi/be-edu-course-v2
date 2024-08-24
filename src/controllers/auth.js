import { z } from "zod"
import { login, register } from "../services/auth.js"

const registerSchema = z.object({
  fullname: z
    .string()
    .min(1, "Fullname is required")
    .max(255, "Fullname is too long"),
  username: z
    .string()
    .min(1, "Username is required")
    .max(255, "Username is too long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password is too long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number"),
  email: z.string().email("Invalid email address"),
})

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password is too long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number"),
})

export async function registerController(req, res) {
  try {
    const { fullname, username, password, email } = registerSchema.parse(
      req.body
    )
    const user = await register(fullname, username, password, email)
    res.send(user)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function loginController(req, res) {
  try {
    const { email, password } = loginSchema.parse(req.body)
    const { token, user } = await login(email, password)

    res.status(200).send({
      message: "Login Success",
      token,
      user: {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
      },
    })
  } catch (error) {
    res.status(400).send(error)
  }
}
