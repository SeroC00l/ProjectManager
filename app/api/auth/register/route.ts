import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { generateHash } from "@/lib/password";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      const newResponse = new NextResponse("data not found");
      return newResponse.json();
    }
    const hashedPassword = generateHash(password);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      const newResponse = new NextResponse("User with this email already exists");
      return newResponse.json();
    }
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const newResponse = new NextResponse("User registered successfully");
    return newResponse.json();
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    return res.status(500).json({ message: "Error al registrar usuario" });
  }
}
