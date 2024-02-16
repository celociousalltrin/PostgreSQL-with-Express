import express, { Router, Request, Response, NextFunction } from "express";
import path from "path";
import authUserRouter from "./auth-user";
import { authUserMiddleware } from "../middlewares/auth.user.middleware";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.use("/auth", authUserRouter);

export default router;
