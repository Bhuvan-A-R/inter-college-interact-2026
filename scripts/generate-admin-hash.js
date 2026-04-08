const bcrypt = require("bcrypt");

async function generateAdminHash() {
  // Set your desired plain password here (CLI arg support)
  const plainPassword = process.argv[2] || "admin123";

  try {
    const hash = await bcrypt.hash(plainPassword, 13);

    console.log("=== Admin Password Hashes (bcrypt.hash(plain, 13)) ===");
    console.log(`Plain Password: ${plainPassword}`);
    console.log(`Bcrypt Hash:     ${hash}`);
    console.log("");
    console.log("=== Prisma SQL Insert ===");
    console.log(
      `INSERT INTO "Users" (email, phone, collegeName, collegeCode, region, password, role, "createdAt") VALUES`,
    );
    console.log(
      `('admin@interact2k26.com', '9999999999', 'Global Academy of Technology', 'ADMIN001', 'Bangalore', '${hash}', 'ADMIN', NOW());`,
    );
    console.log("");
    console.log("=== Login Credentials ===");
    console.log(`Email: admin@interact2k26.com`);
    console.log(`Password: ${plainPassword}`);
    console.log("");
    console.log(
      "Run after: DATABASE_URL setup + npx prisma db push + npx prisma studio",
    );
  } catch (error) {
    console.error("Error generating hash:", error);
  }
}

generateAdminHash();
