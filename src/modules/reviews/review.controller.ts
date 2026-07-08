import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { reviewService } from "./review.service";

const createReview = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const result = await reviewService.createReview(
      userId,
      req.body
    );

    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Review created successfully",
      data: result,
    });
  }
);

export const reviewController = {
  createReview,
};