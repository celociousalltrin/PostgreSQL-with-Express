import { Router } from "express";
import { getUser, deleteUser } from "../controllers/userController";

const router = Router();

router.get("/get-user", getUser);
router.put("/delete-user", deleteUser);

export default router;
