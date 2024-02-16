import express, { Router, Request, Response, NextFunction } from "express";
import path from "path";
import authUserRouter from "./auth-user";
import userRouter from "./user-routes";
import postRouter from "./post-routes";
import likesRouter from "./likes-routes";
import notificationRouter from "./notification-routes";
import { authUserMiddleware } from "../middlewares/auth.user.middleware";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.use("/auth", authUserRouter);
router.use("/user", authUserMiddleware, userRouter);
router.use("/post", authUserMiddleware, postRouter);
router.use("/like", authUserMiddleware, likesRouter);
router.use("/notification", authUserMiddleware, notificationRouter);

export default router;
