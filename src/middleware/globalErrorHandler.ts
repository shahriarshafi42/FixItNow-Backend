import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Prisma } from "../../generated/prisma/client";


export const globalErrorHandlar = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode 
  let errorMessage = err.message || "Internal Sarver errror";
  let errorName = err.name || "Internal Sarver errror";

  if (err instanceof Prisma.PrismaClientValidationError) {
     statusCode = httpStatus.BAD_REQUEST
     errorMessage = "Authentication failed against database serve"
  }
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
        statusCode= httpStatus.BAD_REQUEST
        errorMessage= "Duplicatee error"
    }
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: statusCode,
    name: errorName,
    message: errorMessage,
    error: err.stack,
  });
};
