import { PrismaClient } from "@prisma/client";
import { hashPassword, verifyPassword } from "../src/lib/auth";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@urbankitchen.com";
  const password = "admin123";

  const adminRole = await prisma.role.upsert({
    where: {
      roleName: "admin",
    },
    update: {
      permissions: "all",
    },
    create: {
      roleName: "admin",
      permissions: "all",
    },
  });

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.upsert({
    where: {
      email,
    },
    update: {
      name: "Admin",
      password: hashedPassword,
      roleId: adminRole.id,
      status: "active",
      emailVerified: true,
    },
    create: {
      name: "Admin",
      email,
      password: hashedPassword,
      roleId: adminRole.id,
      status: "active",
      emailVerified: true,
    },
    include: {
      role: true,
    },
  });

  const passwordCheck = await verifyPassword(password, user.password);

  console.log("Admin created/updated successfully");
  console.log("Email:", email);
  console.log("Password:", password);
  console.log("Role:", user.role.roleName);
  console.log("Status:", user.status);
  console.log("Password verify test:", passwordCheck);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });