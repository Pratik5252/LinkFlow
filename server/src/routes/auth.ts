import { Router } from "express";
import { register } from "../controllers/auth/register.js";
import { getMeContoller } from "../controllers/auth/getMeController.js";
import authenticateToken from "../middleware/auth.js";
import { login } from "../controllers/auth/login.js";
import { googleAuth } from "../controllers/auth/googleAuth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleAuth);
router.get("/me", authenticateToken, getMeContoller);

export default router;
