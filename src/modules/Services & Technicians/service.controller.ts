import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { servicesservice } from "./services.service";
import httpStatus from "http-status";

const createService = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const result = await servicesservice.createService(
    userId,
    req.body
  );

  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Service created successfully",
    data: result,
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const result = await servicesservice.getalallservices(req.query);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Services retrieved successfully",
    data: result,
  });
});

const getAllTechnicians = catchAsync(async (req: Request, res: Response) => {


})

const getAllTechniciansreviews = catchAsync(async (req: Request, res: Response) => {

})

const getAllServicescategories = catchAsync(async (req: Request, res: Response) => {

})


export const serviceController = {
  getAllServices,
  getAllTechnicians,
  getAllTechniciansreviews,
  getAllServicescategories,
  createService,
};