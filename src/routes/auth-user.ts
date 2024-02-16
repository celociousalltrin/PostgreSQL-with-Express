import { Router } from "express";
import { Login, createUser } from "../controllers/authUserController";

const router = Router();

router.post("/create-user", createUser);
router.post("/login", Login);

export default router;
