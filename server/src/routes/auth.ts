import { Router } from "express";
import { register } from "../controllers/auth/register";
import { getMeContoller } from "../controllers/auth/getMeController";
import authenticateToken from "../middleware/auth";
import { login } from "../controllers/auth/login";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", authenticateToken, getMeContoller);

export default authRouter;
