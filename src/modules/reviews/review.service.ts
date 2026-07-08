import { prisma } from "../../lib/prisma";
import { IReview } from "./review.interface";

const createReview = async (
  userId: string,
  payload: IReview
) => {
  const { bookingId, rating, comment } = payload;

  const booking = await prisma.booking.findUniqueOrThrow({
    where: {
      id: bookingId,
    },
  });

  // Only booking owner can review
  if (booking.customerId !== userId) {
    throw new Error("You are not authorized to review this booking.");
  }

  // Booking must be completed
  if (booking.status !== "COMPLETED") {
    throw new Error("You can review only completed bookings.");
  }

  // Prevent duplicate reviews
  const existingReview = await prisma.review.findUnique({
    where: {
      bookingId,
    },
  });

  if (existingReview) {
    throw new Error("Review already submitted.");
  }

  const review = await prisma.$transaction(async (tx) => {
    const createdReview = await tx.review.create({
      data: {
        rating,
        comment,
        bookingId,
        customerId: userId,
        technicianId: booking.technicianId,
      },
    });

    // Update technician average rating
    const reviews = await tx.review.findMany({
      where: {
        technicianId: booking.technicianId,
      },
      select: {
        rating: true,
      },
    });

    const average =
      reviews.reduce((sum, item) => sum + item.rating, 0) /
      reviews.length;

    await tx.technicianProfile.update({
      where: {
        id: booking.technicianId,
      },
      data: {
        averageRating: average,
      },
    });

    return createdReview;
  });

  return review;
};

export const reviewService = {
  createReview,
};