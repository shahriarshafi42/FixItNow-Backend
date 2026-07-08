import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from "http-status";
import { adminService } from "./admin.service";

const getAllUsers = catchAsync(
  async (req: Request, res: Response) => {
    const result = await adminService.getAllUsers();

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Users retrieved successfully",
      data: result,
    });
  }
);

const updateUserStatus = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.id as string;
    const { status } = req.body;

    const result = await adminService.updateUserStatus(
      userId,
      status
    );

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "User status updated successfully",
      data: result,
    });
  }
);

const getAllBookings = catchAsync(
  async (req: Request, res: Response) => {
    const result = await adminService.getAllBookings();

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Bookings retrieved successfully",
      data: result,
    });
  }
);

const getAllCategories = catchAsync(
  async (req: Request, res: Response) => {
    const result = await adminService.getAllCategories();

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Categories retrieved successfully",
      data: result,
    });
  }
);

const createCategory = catchAsync(
  async (req: Request, res: Response) => {
    const result = await adminService.createCategory(req.body);

    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Category created successfully",
      data: result,
    });
  }
);



export const adminController = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
  getAllCategories,
    createCategory,
};