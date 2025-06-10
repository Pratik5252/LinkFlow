import { Router } from "express";
import authenticateToken from "../middleware/auth";
import { createShortUrl } from "../controllers/url/createShortUrl";
import { getAllUrls } from "../controllers/url/getUrl";
import { getUrlVisits } from "../controllers/url/getUrlVisits";
import { deleteUrl } from "../controllers/url/deleteurl";

const router = Router();

router.post("/", authenticateToken, createShortUrl);

router.get("/", authenticateToken, getAllUrls);
router.get("/:urlId/visits", authenticateToken, getUrlVisits);

router.delete("/:urlId", authenticateToken, deleteUrl);

export default router;
