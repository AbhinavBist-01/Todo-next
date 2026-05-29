"use server";

import { prisma } from "../lib/db";
import bcrypt from "bcryptjs";

export async function signUp(email: string, password: string) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
    return {
      id: user.id,
      email: user.email,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return {
      id: user.id,
      email: user.email,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
