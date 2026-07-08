import { UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { ICategory } from "./admin.interface";

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    omit: {
      password: true,
    },
    include: {
      technician: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};

const updateUserStatus = async (
  userId: string,
  status: UserStatus
) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      status,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return updatedUser;
};

const getAllBookings = async () => {
  const bookings = await prisma.booking.findMany({
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          address: true,
        },
      },
      technician: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              address: true,
            },
          },
        },
      },
      service: {
        include: {
          category: true,
        },
      },
      payment: true,
      review: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return bookings;
};
  
const getAllCategories = async () => {
  return await prisma.category.findMany({
    include: {
      _count: {
        select: {
          services: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
};


const createCategory = async (payload: ICategory) => {
  const { name } = payload;

  // Check if category already exists
  const isCategoryExist = await prisma.category.findUnique({
    where: {
      name,
    },
  });

  if (isCategoryExist) {
    throw new Error("Category already exists");
  }

  const category = await prisma.category.create({
    data: {
      name,
    },
  });

  return category;
};


export const adminService = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
  getAllCategories,
    createCategory,
};