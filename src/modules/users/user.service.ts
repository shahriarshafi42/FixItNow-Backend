import { Request, Response, Router } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import httpStatus from "http-status";
import { RegisterUserPayload } from "./user.interface";



const registerIntoDB = async(payload: RegisterUserPayload )=>{
    const { name, email, password, role, experience, hourlyRate } = payload;

 const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExist) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role, // Save the user's role
    },
  });

  // Create Technician Profile only if the user is a technician
  if (role === "TECHNICIAN") {
    await prisma.technicianProfile.create({
      data: {
        userId: createdUser.id,
        experience: Number(experience),
        hourlyRate: Number(hourlyRate),
      },
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
    },
    omit: {
      password: true,
    },
    include: {
      technician: true, // or technicianProfile depending on your schema
    },
  });

  return user;







}

export const userService = {
    registerIntoDB
}