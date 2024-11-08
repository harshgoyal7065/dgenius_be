import { Router } from 'express';
import { registerAdmin, loginAdmin, createSubUser, getSubUsers } from '../controllers/admin.ctrl';
import { authenticate } from '../middleware/auth.middleware';

const adminRouter = Router();

// Register a new admin
adminRouter.post('/register', registerAdmin);

// Admin login
/// @ts-ignore
adminRouter.post('/login', loginAdmin);

// Get all sub-users under the logged-in admin
/// @ts-ignore
adminRouter.get('/sub-users', authenticate('admin'), getSubUsers);

// Create a new sub-user under the logged-in admin
/// @ts-ignore
adminRouter.post('/sub-users', authenticate('admin'), createSubUser);

export default adminRouter;
