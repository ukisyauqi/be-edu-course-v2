import { Router } from "express"
import {
  createCourseController,
  deleteCourseController,
  getCourseController,
  getCoursesController,
  updateCourseController,
} from "../controllers/course.js"
import {
  loginController,
  registerController,
  verifyEmailController,
} from "../controllers/auth.js"
import { authMiddleware } from "../middlewares/auth.js"
import upload from "../middlewares/upload.js"
import { uploadController } from "../controllers/upload.js"

const router = Router()

router.get("/courses", authMiddleware, getCoursesController)

router.get("/courses/:id", authMiddleware, getCourseController)

router.post("/courses", authMiddleware, createCourseController)

router.put("/courses/:id", authMiddleware, updateCourseController)

router.delete("/courses/:id", authMiddleware, deleteCourseController)

router.post("/register", registerController)

router.post("/login", loginController)

router.get("/verify-email", verifyEmailController)

router.post("/upload", authMiddleware, upload.single("image"), uploadController)

export default router
