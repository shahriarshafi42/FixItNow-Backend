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
    role,

    ...(role === "TECHNICIAN" && {
      technician: {
        create: {
          experience: Number(experience),
          hourlyRate: Number(hourlyRate),
        },
      },
    }),
  },
});
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

const getMyProfile = async (userId : string) => {

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    omit: {
      password: true,
    },
    include: {
      technician: true, // or technicianProfile depending on your schema
    },
  })
  return user;
}

const updateTechnicianProfile = async (userId: string, payload: any) => {

const {name, email, bio, experience, hourlyRate} = payload;
const updatedUser = await prisma.user.update({

  where: {
    id: userId,
  },
  data: {
    name,
    email,
    technician: {
      update: {
        bio,
        experience: Number(experience),
        hourlyRate: Number(hourlyRate),
      }
    }
  },
  omit: {
    password: true,
  },
  include: {
    technician: true,
  }
})

return updatedUser;
}

const updateAvailability = async (
  userId: string,
  payload: any
) => {
  const {  dayOfWeek, startTime, endTime } = payload;

  const technician = await prisma.technicianProfile.findUniqueOrThrow({
    where: {
      userId,
    },
  });

  const availability =
    await prisma.availability.create({
      data: {
        technicianId: technician.id,
        dayOfWeek,
        startTime,
        endTime,
      },
    });

  return availability;
};
export const userService = {
    registerIntoDB,
    getMyProfile,
    updateTechnicianProfile,
    updateAvailability
}
