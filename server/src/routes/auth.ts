import { Router } from 'express';
import { register } from '../controllers/auth/register.js';
import { getMeContoller } from '../controllers/auth/getMeController.js';
import authenticateToken from '../middleware/auth.js';
import { login } from '../controllers/auth/login.js';
import { logout } from '../controllers/auth/logout.js';
import { googleAuth } from '../controllers/auth/googleAuth.js';
import { deleteUser } from '../controllers/user/deleteUser.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/google', googleAuth);
router.get('/me', authenticateToken, getMeContoller);

router.delete('/user', authenticateToken, deleteUser);

export default router;
