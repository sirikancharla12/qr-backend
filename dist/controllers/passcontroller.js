"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPasses = exports.generatePass = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
const JWT_SECRET = process.env.JWT_SECRET || "mySecretKey";
const generatePass = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
    const numericUserId = decoded.id;
    if (!numericUserId) {
        return res.status(400).json({ message: "User ID not found in token" });
    }
    const { name, passDetails, qrCode, createdAt, location, date } = req.body;
    if (!name || !passDetails) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const newPass = await models_1.prisma.pass.create({
            data: {
                passDetails,
                name,
                qrCode,
                date,
                location,
                user: { connect: { id: numericUserId } },
            },
        });
        res.status(201).json({ success: true, pass: newPass });
    }
    catch (error) {
        console.error("Error generating pass:", error);
        res.status(500).json({ message: "Error creating pass" });
    }
};
exports.generatePass = generatePass;
const getUserPasses = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
    const numericUserId = decoded.id;
    if (!numericUserId) {
        return res.status(400).json({ message: "User ID not found in token" });
    }
    try {
        const passes = await models_1.prisma.pass.findMany({
            where: {
                userId: numericUserId,
            }
        });
        res.status(200).json(passes);
    }
    catch (error) {
        console.error("Error fetching passes:", error);
        res.status(500).json({ message: "Error fetching passes" });
    }
};
exports.getUserPasses = getUserPasses;
