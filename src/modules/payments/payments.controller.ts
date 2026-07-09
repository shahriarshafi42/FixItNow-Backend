import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { paymentService } from "./payments.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const createPaymentSession = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

 const userId = req.user?.id;
 const result = await paymentService.createpayment(userId!);

 sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment session created successfully",
    data: result
 })


})


export const paymentController = {
    createPaymentSession
}