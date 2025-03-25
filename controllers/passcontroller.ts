import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../models";
import QRCode from "qrcode";

const JWT_SECRET = process.env.JWT_SECRET || "mySecretKey";

export const generatePass = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  
  const token = authHeader.split(" ")[1];
  let decoded: any;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
  
  const numericUserId = decoded.id;
  if (!numericUserId) {
    return res.status(400).json({ message: "User ID not found in token" });
  }

  const { name, passDetails ,qrCode,createdAt,location,date} = req.body;
  if (!name || !passDetails) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {


    const newPass = await prisma.pass.create({
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
  } catch (error) {
    console.error("Error generating pass:", error);
    res.status(500).json({ message: "Error creating pass" });
  }
};



export const getUserPasses = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
  
    const token = authHeader.split(" ")[1];
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  
    const numericUserId = decoded.id;
    if (!numericUserId) {
      return res.status(400).json({ message: "User ID not found in token" });
    }
  
    try {
      const passes = await prisma.pass.findMany({
        where:{
           userId: numericUserId ,
        }
      });
  
      res.status(200).json(passes);
    } catch (error) {
      console.error("Error fetching passes:", error);
      res.status(500).json({ message: "Error fetching passes" });
    }
  };
  