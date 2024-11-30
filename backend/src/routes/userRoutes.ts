import express from "express";
import * as UserController from "../controllers/userController";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/me", requiresAuth, UserController.getAuthenticatedUser);
router.post("/signup", UserController.signupLimiter, UserController.signUP);
router.post("/login", UserController.loginLimiter, UserController.login);
router.post("/logout", UserController.logout);

export default router;
