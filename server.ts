import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import passRoutes from "./routes/passroutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: "https://qr-frontend-sigma.vercel.app"
  }));

app.use("/api/auth", userRoutes);
app.use("/api/pass", passRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
