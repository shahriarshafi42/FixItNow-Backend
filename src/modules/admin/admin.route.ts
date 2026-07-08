import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";


const router = Router();

router.get(
  "/",
  auth(Role.ADMIN),
  adminController.getAllUsers
);

router.put(
  "/users/:id",
  auth(Role.ADMIN),
  adminController.updateUserStatus
);

router.get(
  "/allbookings",
  auth(Role.ADMIN),
  adminController.getAllBookings
);

router.get(
  "/allcategories",
  auth(Role.ADMIN),
  adminController.getAllCategories
);

router.post(
  "/createcategories",
  auth(Role.ADMIN),
  adminController.createCategory
);


export const adminRoutes = router;