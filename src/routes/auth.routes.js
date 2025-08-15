import { auth } from '../controllers/auth.controller.js';
import { validateRegisterData } from '../middleware/auth.middleware.js';
import { validateLoginData } from '../middleware/auth.middleware.js';
import { Router } from 'express';
const router = Router();

router.post('/auth/register',validateRegisterData, auth.createAccount);
router.post('/auth/login',validateLoginData,auth.login);

export default router;