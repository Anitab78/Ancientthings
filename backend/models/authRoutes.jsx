import express from 'express';
import { register, login, getMe } from './authController.jsx';
import { protect } from './middleware.jsx';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

export default router;
