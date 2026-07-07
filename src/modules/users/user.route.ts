import { NextFunction, Request, Response, Router } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import httpStatus from "http-status";
import { userController } from "./user.controller";
import { jwtUtils } from "../../utils/jwt";
import { Role } from "../../../generated/prisma/enums";


const router = Router();

declare global {
  namespace Express {
    interface Request { 
      user?: {
        id: string;
        name: string;
        email: string;
        role: Role;
      };
    }
  }
}



router.post("/register", userController.registerUser);

router.get  ("/me",(req: Request, res: Response, next : NextFunction)=>{

    const {accessToken} = req.cookies;
       console.log(accessToken)
    
       const verifiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret);
       
       
       
       if(typeof verifiedToken === "string" ) {
           throw new Error("Invalid token");
        }
        const {id, name, email, role} = verifiedToken;
        const requiredRole = [Role.ADMIN, Role.TECHNICIAN, Role.CUSTOMER]
        
        if(!requiredRole.includes(role)){
            return res.status(403).json({
                success: false,
                statusCode: httpStatus.FORBIDDEN,
                message: "You are not authorized to access this resource",
            });
        }
        req.user = {id, name, email, role};

  next();
}, userController.getMyProfile);



export const userRoutes = router;