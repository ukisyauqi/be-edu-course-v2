import prisma from "../db.js"

export async function getCourses(search, sortBy, sortOrder, filters) {
  const { category, tutor } = filters

  // Query object for Prisma
  const query = {
    where: {
      AND: [
        search ? { name: { contains: search, mode: "insensitive" } } : {},
        category ? { categoryId: category } : {},
        tutor ? { tutorId: tutor } : {},
      ],
    },
    orderBy: {},
  }

  // Handle sorting
  if (sortBy) {
    query.orderBy[sortBy] = sortOrder || "asc"
  }

  // Fetch courses from database
  const courses = await prisma.course.findMany(query)
  return courses
}

export async function getCourse(id) {
  const course = await prisma.course.findUnique({
    where: { id },
  })

  if (!course) throw new Error("Course not found")
  return course
}

export async function createCourse(name, description, categoryId, tutorId) {
  const course = await prisma.course.create({
    data: {
      name,
      description,
      categoryId,
      tutorId,
    },
  })
  return course
}

export async function updateCourse(id, name, description, categoryId, tutorId) {
  const course = await prisma.course.update({
    where: { id },
    data: {
      name,
      description,
      categoryId,
      tutorId,
    },
  })
  return course
}

export async function deleteCourse(id) {
  const result = await prisma.course.delete({
    where: { id },
  })
  return result
}
