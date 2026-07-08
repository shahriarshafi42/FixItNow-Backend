import e, { Router } from "express";
import { serviceController } from "./service.controller";

const router = Router();

router.get("/allservices",serviceController.getAllServices);

router.get("/technicians",serviceController.getAllTechnicians);

router.get("/technicians/:id",serviceController.getAllTechniciansreviews);

router.get("/categories",serviceController.getAllServicescategories);

export const serviceRoutes = router;