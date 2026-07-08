import e, { Router } from "express";
import { serviceController } from "./service.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  auth(Role.TECHNICIAN),
  serviceController.createService
);

router.get("/allservices", serviceController.getAllServices);

router.get("/technicians",serviceController.getAllTechnicians);

router.get("/technicians/:id",serviceController.getTechnicianWithReviews);

router.get("/categories",serviceController.getAllCategories);

export const serviceRoutes = router;