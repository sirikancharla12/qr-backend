import { Router } from "express";
import { generatePass, getUserPasses } from "../controllers/passcontroller";

const router = Router();

router.post("/create", generatePass);

router.get("/user/:userId", getUserPasses);

router.get("/dashboard", async (req, res) => {
  res.json({
    message: "Welcome to your dashboard!",
    user: req.user,
  });
});
export default router;
