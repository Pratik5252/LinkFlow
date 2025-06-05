import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import urlRoutes from "./routes/url";
import { redirectUrl } from "./controllers/url/redirectUrl";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);

app.get("/:shorturl", redirectUrl);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
