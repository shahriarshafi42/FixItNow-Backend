import { NextFunction, Request, Response, Router } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import httpStatus from "http-status";
import { userController } from "./user.controller";
import { jwtUtils } from "../../utils/jwt";
import { Role } from "../../../generated/prisma/enums";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { auth } from "../../middleware/auth";

const router = Router();



router.post("/register", userController.registerUser);



router.get( "/me",auth(Role.ADMIN, Role.TECHNICIAN, Role.CUSTOMER),

  //   (req: Request, res: Response, next : NextFunction)=>{

  //     const {accessToken} = req.cookies;
  //        console.log(accessToken)

  //        const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret);

  //      if(!verifiedToken.success){
  //       throw new Error(verifiedToken.error)
  //      }
  //         const {id, name, email, role} = verifiedToken.data as JwtPayload;

  //         const requiredRole = [Role.ADMIN, Role.TECHNICIAN, Role.CUSTOMER]

  //         if(!requiredRole.includes(role)){
  //             return res.status(403).json({
  //                 success: false,
  //                 statusCode: httpStatus.FORBIDDEN,
  //                 message: "You are not authorized to access this resource",
  //             });
  //         }
  //         req.user = {id, name, email, role};

  //   next();
  // },

  userController.getMyProfile,
);

router.put("/technician-profile", auth(Role.TECHNICIAN), userController.updateTechnicianProfile);

export const userRoutes = router;
