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

const getBooking = catchAsync(async (req: Request, res: Response) => {


})

const getbookingDetails = catchAsync(async (req: Request, res: Response) => {
  
});



export const bookingController = {
  createBooking,
   getBooking,
   getbookingDetails,
};