"use server"; // This file should only run on the server - More like writing the api to sign up user
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export const signUp = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string, 
) => {

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    // return "User with this email already exist.";
    return { detail: "User with this email already exist." };
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: passwordHash,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber
    },
  });

  // return "Successfully created a new user";
  return { detail: "Successfully created a new user", user: newUser };
};
