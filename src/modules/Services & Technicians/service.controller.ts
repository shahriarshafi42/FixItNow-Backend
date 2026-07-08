import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { servicesservice } from "./services.service";
import httpStatus from "http-status";
import { categoryService } from "../category/category.service";

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
  const result = await servicesservice.getAllServices(req.query);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Services retrieved successfully",
    data: result,
  });
});

const getAllTechnicians = catchAsync(
  async (req: Request, res: Response) => {
    const result = await servicesservice.getAllTechnicians(req.query);

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Technicians retrieved successfully",
      data: result,
    });
  }
);

const getTechnicianWithReviews = catchAsync(
  async (req: Request, res: Response) => {
    const technicianId = req.params.id as string;

    const result = await servicesservice.getTechnicianWithReviews(
      technicianId
    );

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Technician profile retrieved successfully",
      data: result,
    });
  }
);

const getAllCategories = catchAsync(
  async (req: Request, res: Response) => {
    const result = await servicesservice.getAllCategories();

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Categories retrieved successfully",
      data: result,
    });
  }
);



export const serviceController = {
  getAllServices,
  getAllTechnicians,
  getTechnicianWithReviews,
  getAllCategories,
  createService,
};