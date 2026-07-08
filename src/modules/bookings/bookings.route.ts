import e, { Router } from "express";
import { auth } from "../../middleware/auth";
import { bookingController } from "./bookings.controller";
import { Role } from "../../../generated/prisma/client";


const router = Router();

router.post("/create", auth(Role.CUSTOMER), bookingController.createBooking);

router.get("/getallbookings", auth(Role.CUSTOMER), bookingController.getBookings);

router.get("/booking-details/:id", auth(Role.CUSTOMER), bookingController.getBookingById );

export const bookingRoutes = router;