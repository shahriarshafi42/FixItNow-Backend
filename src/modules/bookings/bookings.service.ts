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

const getBooking = async (userId: string) => {

};
const getbookingDetails = async (bookingId: string) => {

}

export const bookingService = {
  createBooking,
  getBooking,
  getbookingDetails
};
