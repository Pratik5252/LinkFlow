import { Router } from "express";
import authenticateToken from "../middleware/auth";
import { createShortUrl } from "../controllers/url/createShortUrl";
import { getAllUrls } from "../controllers/url/getUrl";
import { getUrlVisits } from "../controllers/url/getUrlVisits";

const urlRoutes = Router();

urlRoutes.post("/shorturl", authenticateToken, createShortUrl);

urlRoutes.get("/geturl", authenticateToken, getAllUrls);
urlRoutes.get("/:urlId/visits", authenticateToken, getUrlVisits);

export default urlRoutes;
