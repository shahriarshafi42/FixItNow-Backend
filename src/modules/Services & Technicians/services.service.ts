import { prisma } from "../../lib/prisma";
import { ICreateService } from "./services.interface";
const createService = async (
  userId: string,
  payload: ICreateService
) => {
  const { title, description, price, categoryId } = payload;

  // Find the technician profile of the logged-in user
  const technician = await prisma.technicianProfile.findUniqueOrThrow({
    where: {
      userId,
    },
  });

  // Check category exists
  await prisma.category.findUniqueOrThrow({
    where: {
      id: categoryId,
    },
  });

  // Create service
  const result = await prisma.service.create({
    data: {
      title,
      description,
      price: Number(price),
      categoryId,
      technicianId: technician.id,
    },
    include: {
      technician: true,
      category: true,
    },
  });

  return result;
};


const getalallservices = async (query: any) => {
  const { type, location, rating, minPrice, maxPrice } = query;

  const where: any = {};

  if (type) {
    where.category = {
      name: {
        contains: type,
        mode: "insensitive",
      },
    };
  }

  if (location) {
    where.technician = {
      location: {
        contains: location,
        mode: "insensitive",
      },
    };
  }

  if (rating) {
    where.technician = {
      ...where.technician,
      averageRating: {
        gte: Number(rating),
      },
    };
  }

  if (minPrice || maxPrice) {
    where.price = {};

    if (minPrice) {
      where.price.gte = Number(minPrice);
    }

    if (maxPrice) {
      where.price.lte = Number(maxPrice);
    }
  }

  const result = await prisma.service.findMany({
    where,
    include: {
      technician: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};


const getalltechnicians = ()=>{

}
const getalltechniciansreviews = ()=>{

}

const getallservicescategories = ()=>{

}

export const servicesservice = {
    getalallservices,
    getalltechnicians,
    getalltechniciansreviews,
    getallservicescategories,
    createService
}
