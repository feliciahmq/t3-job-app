import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "demo@example.com";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("Demo user already exists.");
    return;
  }

  const hashedPassword = await bcrypt.hash("password", 10);

  const user = await prisma.user.create({
    data: {
      name: "demo",
      email: "demo@example.com",
      password: hashedPassword,
      jobApplications: {
        create: [
          {
            company: "OpenAI",
            position: "AI Engineer",
            location: "Remote",
            status: "INTERVIEW",
          },
          {
            company: "Google",
            position: "Software Intern",
            location: "Singapore",
            status: "APPLIED",
          },
        ],
      },
    },
  });

  console.log("Seeded demo user:", user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  /* eslint-disable */
  .finally(async () => {
    await prisma.$disconnect();
  });
