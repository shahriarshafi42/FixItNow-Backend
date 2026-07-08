import { prisma } from "../../lib/prisma";
import { ICreateCategory } from "./category.interface";

const createCategory = async (payload: ICreateCategory) => {
  const { name } = payload;

  const isCategoryExist = await prisma.category.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });

  if (isCategoryExist) {
    throw new Error("Category already exists");
  }

  const result = await prisma.category.create({
    data: {
      name,
    },
  });

  return result;
};

export const categoryService = {
  createCategory,
};