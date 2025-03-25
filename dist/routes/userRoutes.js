"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usercontroller_1 = require("../controllers/usercontroller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post("/register", usercontroller_1.registerUser);
router.post("/login", usercontroller_1.loginUser);
router.get("/dashboard", auth_1.authenticateJWT, usercontroller_1.getUserDetails);
exports.default = router;
