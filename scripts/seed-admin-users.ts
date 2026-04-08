import bcrypt from "bcrypt";
import prisma from "../lib/db";
import { adminDepartmentSeed } from "../data/adminSeed";

async function main() {
  for (const dept of adminDepartmentSeed) {
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          { email: dept.email },
          { phone: dept.phone },
          { collegeName: dept.collegeName },
          { deptCode: dept.deptCode },
        ],
      },
    });

    if (existingUser) {
      console.log(`Skipping existing admin account for ${dept.deptName} (${dept.email})`);
      continue;
    }

    const password = dept.password ?? "Admin@1234";
    const hashedPassword = await bcrypt.hash(password, 13);

    await prisma.users.create({
      data: {
        collegeName: dept.collegeName,
        email: dept.email,
        phone: dept.phone,
        password: hashedPassword,
        deptCode: dept.deptCode,
        region: dept.region,
        role: dept.role ?? "SPOC",
      },
    });

    console.log(`Created ADMIN user for ${dept.deptName} (${dept.email})`);
  }
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
