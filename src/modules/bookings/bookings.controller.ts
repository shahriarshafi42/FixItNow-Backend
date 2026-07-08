import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

const createBooking = catchAsync(async (req: Request, res: Response) => {


}
)
const getBooking = catchAsync(async (req: Request, res: Response) => {


})

const getbookingDetails = catchAsync(async (req: Request, res: Response) => {

}
)

export const bookingController = {
  createBooking,
   getBooking,
   getbookingDetails,
};