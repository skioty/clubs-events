// src/app/auth/page.jsx
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  const hashedPassword = await bcrypt.hash("test123", 10);

  await prisma.user.create({
    data: {
      email: "test@example.com",
      password: hashedPassword,
      name: "Test User",
    },
  });
}

main()
  .then(() => {
    console.log("User created");
  })
  .catch((e) => {
    console.error(e);
  });
