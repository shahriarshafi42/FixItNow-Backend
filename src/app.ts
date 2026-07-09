import cookieParser from "cookie-parser";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import httpStatus from "http-status";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import {  userRoutes } from "./modules/users/user.route";
import { authRoutes } from "./modules/auth/auth.route";
import { serviceRoutes } from "./modules/Services & Technicians/services.route";
import { bookingRoutes } from "./modules/bookings/bookings.route";
import { categoryRoutes } from "./modules/category/category.route";
import { reviewRoutes } from "./modules/reviews/review.route";
import { adminRoutes } from "./modules/admin/admin.route";
import { notFound } from "./middleware/notFound";
import { globalErrorHandlar,  } from "./middleware/globalErrorHandler";
import { paymentRoutes } from "./modules/payments/payments.route";
import { request } from "https";
import { stripe } from "./lib/stripe";



const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);
const endpointSecret = config.stripe_webhook_secret;

// app.post("api/payments/webhook",  express.raw({type: 'application/json'}),( request, response )=>{

//  let event = request.body;
//  console.log("stripe request body", event);
//  console.log("stripe request headers", request.headers);
//   // Only verify the event if you have an endpoint secret defined.
//   // Otherwise use the basic event deserialized with JSON.parse
//   if (endpointSecret) {
//     // Get the signature sent by Stripe
//     const signature = request.headers['stripe-signature'];
//     try {
//       event = stripe.webhooks.constructEvent(
//         request.body,
//         signature as string,
//         endpointSecret
//       );
//     } catch (err: any) {
//       console.log(`⚠️  Webhook signature verification failed.`, err.message);
//       return response.status(400).json({ message: `Webhook Error: ${err.message}` });
//     }
//   }
//   console.log(event, "event after try block");
  

//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntent = event.data.object;
//       console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
//       // Then define and call a method to handle the successful payment intent.
//       // handlePaymentIntentSucceeded(paymentIntent);
//       break;
//     case 'payment_method.attached':
//       const paymentMethod = event.data.object;
//       // Then define and call a method to handle the successful attachment of a PaymentMethod.
//       // handlePaymentMethodAttached(paymentMethod);
//       break;
//     default:
//       // Unexpected event type
//       console.log(`Unhandled event type ${event.type}.`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();

// })
app.use("/api/payments/webhook",express.raw({type: 'application/json'}),)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("hello world app ");
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);


app.use(notFound);

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//   success: false,
//   statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//   message: err.message ,
//   error: err.stack,

// })
// })
 
app.use(globalErrorHandlar);
export default app;
