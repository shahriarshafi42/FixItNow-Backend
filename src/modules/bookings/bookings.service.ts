import { prisma } from "../../lib/prisma";
import { ICreateBooking } from "./bookings.interface";

const createBooking = async (userId: string, payload: ICreateBooking) => {
  const {
    technicianId,
    serviceId,
    bookingDate,
  } = payload;

  // Check technician
  await prisma.technicianProfile.findUniqueOrThrow({
    where: {
      id: technicianId,
    },
  });

  // Check service
  await prisma.service.findUniqueOrThrow({
    where: {
      id: serviceId,
    },
  });

  const booking = await prisma.$transaction(async (tx) => {
    const createdBooking = await tx.booking.create({
      data: {
        customerId: userId,
        technicianId,
        serviceId,
        bookingDate: new Date(bookingDate),
        status: "REQUESTED",
      },
      include: {
        customer: true,
        technician: true,
        service: true,
      },
    });

    return createdBooking;
  });

  return booking;
};

const getBookings = async (userId: string) => {
  const result = await prisma.booking.findMany({
    where: {
      customerId: userId,
    },
    include: {
      technician: {
        include: {
          user: true,
        },
      },
      service: true,
      payment: true,
      review: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};


const getBookingById = async (bookingId: string) => {
  const result = await prisma.booking.findUniqueOrThrow({
    where: {
      id: bookingId,
    },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
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
            },
          },
        },
      },
      service: true,
      payment: true,
      review: true,
    },
  });

  return result;
};

export const bookingService = {
  createBooking,
  getBookings,
  getBookingById
};

