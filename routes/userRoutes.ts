import { Router } from "express";
import { registerUser, loginUser, getUserDetails } from "../controllers/usercontroller";
import { authenticateJWT } from "../middlewares/auth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", authenticateJWT, getUserDetails);

export default router;
