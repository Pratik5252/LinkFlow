import { Router } from "express";
import authenticateToken from "../middleware/auth";
import { createShortUrl } from "../controllers/url/createShortUrl";

const urlRoutes = Router();

urlRoutes.post("/shorturl", authenticateToken, createShortUrl);


export default urlRoutes;
