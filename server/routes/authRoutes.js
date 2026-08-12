import express from 'express';
import { 
  login, 
  register, 
  getMe,
  getAllUsers,
  updateUserRole,
  createUser,
  deleteUser
} from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', getMe);

// User Role Management Endpoints
router.get('/users', getAllUsers);
router.post('/users', createUser);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

export default router;
