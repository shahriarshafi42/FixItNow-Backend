import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { bookingService } from "./bookings.service";
import httpStatus from "http-status";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id  ;

  const result = await bookingService.createBooking(
    userId,
    req.body
  );

  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Booking created successfully",
    data: result,
  });
});

const getBookings = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const result = await bookingService.getBookings(userId);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Bookings retrieved successfully",
    data: result,
  });
});


const getBookingById = catchAsync(
  async (req: Request, res: Response) => {
    const bookingId = req.params.id as string;

    const result = await bookingService.getBookingById(bookingId);

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Single Booking retrieved successfully",
      data: result,
    });
  }
);


export const bookingController = {
  createBooking,
   getBookings,
   getBookingById,
};