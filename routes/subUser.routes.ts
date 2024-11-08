import { Router } from 'express';
import { loginSubUser, getSubUserProfile } from '../controllers/subUser.ctrl';
import { authenticate } from '../middleware/auth.middleware';

const subUserRouter = Router();

// Sub-user login
/// @ts-ignore
subUserRouter.post('/login', loginSubUser);

// Get the logged-in sub-user's profile information
/// @ts-ignore
subUserRouter.get('/profile', authenticate('sub-user'), getSubUserProfile);

export default subUserRouter;
