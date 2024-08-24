import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "../services/course.js"
import { z } from "zod"

const courseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  categoryId: z.number().int().positive("Invalid category ID"),
  tutorId: z.number().int().positive("Invalid tutor ID"),
})

const idSchema = z.number().int().positive("Invalid tutor ID")

export async function getCoursesController(req, res) {
  try {
    const { search, sortBy, sortOrder, category, tutor } = req.query

    // Menyiapkan filters dari query parameters
    const filters = {
      category: category ? Number(category) : undefined,
      tutor: tutor ? Number(tutor) : undefined,
    }

    const courses = await getCourses(search, sortBy, sortOrder, filters)
    res.status(200).json(courses)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get courses", error: error.message })
  }
}

export async function getCourseController(req, res) {
  try {
    const id = idSchema.parse(Number(req.params.id))
    const course = await getCourse(id)
    res.send(course)
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function createCourseController(req, res) {
  try {
    const { name, description, categoryId, tutorId } = courseSchema.parse(
      req.body
    )
    const course = await createCourse(name, description, categoryId, tutorId)
    res.status(201).send(course)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function updateCourseController(req, res) {
  try {
    const id = idSchema.parse(Number(req.params.id))
    const { name, description, categoryId, tutorId } = courseSchema.parse(
      req.body
    )
    const course = await updateCourse(
      id,
      name,
      description,
      categoryId,
      tutorId
    )
    res.send(course)
  } catch (error) {
    res.status(400).send(error)
  }
}

export async function deleteCourseController(req, res) {
  try {
    const id = idSchema.parse(Number(req.params.id))
    const result = await deleteCourse(id)
    res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
}
