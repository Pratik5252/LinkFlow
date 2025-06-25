import { Router } from "express";
import authenticateToken from "../middleware/auth.js";
import { createShortUrl } from "../controllers/url/createShortUrl.js";
import { getAllUrls } from "../controllers/url/getUrl.js";
import { getUrlVisits } from "../controllers/url/getUrlVisits.js";
import { deleteUrl } from "../controllers/url/deleteurl.js";

const router = Router();

router.post("/", authenticateToken, createShortUrl);

router.get("/", authenticateToken, getAllUrls);
router.get("/:urlId/visits", authenticateToken, getUrlVisits);

router.delete("/:urlId", authenticateToken, deleteUrl);

export default router;
