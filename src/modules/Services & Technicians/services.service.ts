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


const getAllServices = async (query: any) => {
  const { type, rating, minPrice, maxPrice } = query;

  const where: any = {};

  // Filter by category
  if (type) {
    where.category = {
      name: {
        contains: type,
        mode: "insensitive",
      },
    };
  }

  // Filter by technician rating
  if (rating) {
    where.technician = {
      averageRating: {
        gte: Number(rating),
      },
    };
  }

  // Filter by price
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
      category: true,
      technician: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const getAllTechnicians = async (query: any) => {
  const { rating, minRate, maxRate, experience } = query;

  const where: any = {};

  // Filter by average rating
  if (rating) {
    where.averageRating = {
      gte: Number(rating),
    };
  }

  // Filter by hourly rate
  if (minRate || maxRate) {
    where.hourlyRate = {};

    if (minRate) {
      where.hourlyRate.gte = Number(minRate);
    }

    if (maxRate) {
      where.hourlyRate.lte = Number(maxRate);
    }
  }

  // Filter by experience
  if (experience) {
    where.experience = {
      gte: Number(experience),
    };
  }

  const result = await prisma.technicianProfile.findMany({
    where,
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
      services: {
        include: {
          category: true,
        },
      },
      availability: true,
      reviews: true,
    },
    orderBy: {
      averageRating: "desc",
    },
  });

  return result;
};
const getTechnicianWithReviews = async (technicianId: string) => {
  const technician = await prisma.technicianProfile.findUniqueOrThrow({
    where: {
      id: technicianId,
    },
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
      services: {
        include: {
          category: true,
        },
      },
      availability: true,
      reviews: {
        include: {
          customer: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return technician;
};


const getAllCategories = async () => {
  const result = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return result;
};
export const servicesservice = {
    getAllServices,
    getAllTechnicians,
    getTechnicianWithReviews,
    getAllCategories,
    createService
}
