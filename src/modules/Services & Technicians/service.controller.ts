import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

const getAllServices = catchAsync(async (req: Request, res: Response) => {

})

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
};