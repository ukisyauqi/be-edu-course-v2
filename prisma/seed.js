import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  // Seed Course Categories
  const categories = ["web", "android", "ios", "flutter", "reactjs"]

  await prisma.courseCategory.createMany({
    data: categories.map((category) => ({
      name: category,
      description: `Description for category ${category}`,
    })),
  })

  // Seed Tutors
  const tutors = ["Aldi", "Rani", "Dina", "Yoga", "Rian"]

  await prisma.tutor.createMany({
    data: tutors.map((tutor) => ({
      name: `${tutor}`,
      email: `${tutor}@example.com`,
      bio: `Bio for tutor ${tutor}`,
    })),
  })

  // Seed Users
  const users = [
    "Adi Putra",
    "Rina Sari",
    "Budi Santoso",
    "Dewi Lestari",
    "Rizki Ramadhan",
  ]

  await prisma.user.createMany({
    data: users.map((user) => ({
      fullname: `${user}`,
      username: `${user.split(" ")[0]}`,
      password: "password123",
      email: `user${user.split(" ")[0]}@example.com`,
    })),
  })

  // Seed Courses
  const courses = [
    "Pemrograman Dasar",
    "Algoritma",
    "OOP",
    "Frontend",
    "Backend",
    "Mobile",
    "Database",
    "Git",
    "Testing",
    "DevOps",
    "UI/UX",
    "Data Science",
    "Cyber Security",
    "Cloud Computing",
    "AI",
  ]

  await prisma.course.createMany({
    data: courses.map((course) => ({
      name: `${course}`,
      description: `Description for course ${course}`,
      categoryId: Math.floor(Math.random() * 5) + 1,
      tutorId: Math.floor(Math.random() * 5) + 1,
    })),
  })

  console.log("Seeding completed successfully.")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
