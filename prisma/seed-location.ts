import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.employeeLocation.create({
    data: {
      employeeId: "EMP001",
      latitude: 28.6139,
      longitude: 77.209,
      accuracy: 10,
    },
  });

  console.log("Test employee location added");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });