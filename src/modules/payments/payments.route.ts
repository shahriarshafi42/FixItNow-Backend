import { Router } from "express";
import { paymentController } from "./payments.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();


router.post(
    "/create",
    auth(Role.ADMIN, Role.CUSTOMER, Role.TECHNICIAN),
     paymentController.createPaymentSession);

     router.post(
        "/webhook",
        paymentController.handleStripeWebhook)

     router.get(
  "/",
  auth(Role.CUSTOMER,),
  paymentController.getPaymentHistory
);

router.get(
  "/:id",
  auth(Role.CUSTOMER,),
  paymentController.getPaymentDetails
);

export const paymentRoutes = router;
