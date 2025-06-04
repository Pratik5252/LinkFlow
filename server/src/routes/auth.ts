import { Router } from "express";
import { register } from "../controllers/auth/register";
import { getMeContoller } from "../controllers/auth/getMeController";
import authenticateToken from "../middleware/auth";
import { login } from "../controllers/auth/login";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticateToken, getMeContoller);

export default router;
