import { execSync } from "child_process";

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("DATABASE_URL is not defined.");
}

console.log("Seeding database from SQL file...");
execSync(`psql "${dbUrl}" < prisma/seed.sql`, { stdio: "inherit" });

console.log("Database seeded! :>");
