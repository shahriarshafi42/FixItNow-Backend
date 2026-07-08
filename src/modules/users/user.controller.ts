import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { jwtUtils } from "../../utils/jwt";
import { log } from "console";
import jwt from "jsonwebtoken";
import { bookingService } from "../bookings/bookings.service";



const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await userService.registerIntoDB(payload);

    // res.status(httpStatus.CREATED).json({
    //   success: true,
    //   statusCode: httpStatus.CREATED,
    //   message: "User registered successfully",
    //   data: user,
    // });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED, 
      message: "User registered successfully",
      data: {user},
    });
  },
);

const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
  
  //  res.send("hello world app ");


  //  const {accessToken} = req.cookies;
  //  console.log(req.user, "user from middleware");

  //  const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret);

  //  if(typeof verifiedToken === "string" ) {
  //   throw new Error("Invalid token");
  //  }
   const profile = await userService.getMyProfile(req.user!.id as string);
   sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,  
    message: "User profile fetched successfully",
    data: {profile},
  });

  //  console.log(verifiedToken);
   
  })

// const registerUser = async (req: Request, res: Response) => {
//  try {

//      const payload = req.body;

//   const user = await userService.registerIntoDB(payload)

//   res.status(httpStatus.CREATED).json({
//     success: true,
//     statusCode: httpStatus.CREATED,
//     message: "User registered successfully",
//     data: user,
//   });
//  } catch (error) {

//   res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//     success: false,
//     statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//     message: "Failed to register user",
//     error: (error as Error).message,
//   });
//  }
// }

const updateTechnicianProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

 const userId = req.user?.id as string;
 const payload = req.body;
 const updatedUser = await userService.updateTechnicianProfile(userId, payload);

  sendResponse(res, {
  success: true,
  statusCode: httpStatus.OK,  
  message: "Technician profile updated successfully",
  data: {updatedUser},
})


}


)

const updateAvailability = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const payload = req.body;

    const result = await userService.updateAvailability(
      userId,
      payload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Availability updated successfully",
      data: result,
    });
  }
);

const getTechnicianBookings = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const result = await userService.getTechnicianBookings(userId);

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Technician bookings retrieved successfully",
      data: result,
    });
  }
);

const updateBookingStatus = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const bookingId = req.params.id as string;
    const { status } = req.body;

    const result = await userService.updateBookingStatus(
      userId,
      bookingId,
      status
    );

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking status updated successfully",
      data: result,
    });
  }
);
  
export const userController = {
  registerUser,
  getMyProfile,
  updateTechnicianProfile,
  updateAvailability,
  getTechnicianBookings,
  updateBookingStatus
};
