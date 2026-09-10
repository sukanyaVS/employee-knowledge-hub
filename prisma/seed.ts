import { Role } from "../app/generated/prisma/client";
import { prisma } from "../lib/prisma";

async function main() {
  const admin = await prisma.user.upsert({
    where: {
      email: "admin@company.com",
    },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@company.com",
      password: "admin123",
      role: Role.ADMIN,
    },
  });

  const employee = await prisma.user.upsert({
    where: {
      email: "john@company.com",
    },
    update: {},
    create: {
      name: "John Doe",
      email: "john@company.com",
      password: "employee123",
      role: Role.EMPLOYEE,
    },
  });

  const frontend = await prisma.category.upsert({
    where: {
      name: "Frontend",
    },
    update: {},
    create: {
      name: "Frontend",
    },
  });

  const backend = await prisma.category.upsert({
    where: {
      name: "Backend",
    },
    update: {},
    create: {
      name: "Backend",
    },
  });

  const devops = await prisma.category.upsert({
    where: {
      name: "DevOps",
    },
    update: {},
    create: {
      name: "DevOps",
    },
  });

  await prisma.article.createMany({
    data: [
      {
        title: "React Performance",
        description:
          "Learn practical techniques for improving React application performance.",
        content:
          "This article explains memoization, lazy loading, code splitting, and other React performance techniques.",
        categoryId: frontend.id,
        authorId: admin.id,
      },
      {
        title: "Understanding Docker",
        description:
          "A practical introduction to Docker containers and images.",
        content:
          "Docker allows developers to package applications and their dependencies into portable containers.",
        categoryId: devops.id,
        authorId: admin.id,
      },
      {
        title: "Spring Boot Security",
        description:
          "Understand the fundamentals of securing Spring Boot applications.",
        content:
          "Spring Security provides authentication and authorization capabilities for Spring applications.",
        categoryId: backend.id,
        authorId: employee.id,
      },
    ],
  });

  await prisma.announcement.createMany({
    data: [
      {
        title: "Holiday Announcement",
        description:
          "The company will remain closed during the upcoming holiday.",
      },
      {
        title: "New Training Program",
        description:
          "A new employee training program is now available.",
      },
      {
        title: "Office Event",
        description:
          "Join us for the upcoming company office event.",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });