"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passcontroller_1 = require("../controllers/passcontroller");
const router = (0, express_1.Router)();
router.post("/create", passcontroller_1.generatePass);
router.get("/user/:userId", passcontroller_1.getUserPasses);
router.get("/dashboard", async (req, res) => {
    res.json({
        message: "Welcome to your dashboard!",
        user: req.user,
    });
});
exports.default = router;
