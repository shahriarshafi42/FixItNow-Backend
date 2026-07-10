import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { paymentService } from "./payments.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";


const createPaymentSession = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

 const userId = req.user?.id;
 const result = await paymentService.createpayment(userId as string);

 sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment session created successfully",
    data: result
 })


})

const handleStripeWebhook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const event = req.body as Buffer;
    const signature = req.headers['stripe-signature'] as string;
    await paymentService.handleStripeWebhook(event, signature as string);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK, 
        message: "Webhook received successfully",
        data: null  

})
})


const getPaymentHistory = catchAsync(async (req: Request, res: Response) => {
  const user = req.user!;

  const result = await paymentService.getPaymentHistory(user.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment history retrieved successfully",
    data: result,
  });
});


const getPaymentDetails = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user!;
   
    
    const result = await paymentService.getPaymentDetails(
      req.params.id as string,
      user.id
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Payment details retrieved successfully",
      data: result,
    });
  }
);

export const paymentController = {
    createPaymentSession,
    handleStripeWebhook,
    getPaymentHistory,
    getPaymentDetails
}