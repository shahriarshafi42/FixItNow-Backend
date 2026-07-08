import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
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



const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

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



export default app;
