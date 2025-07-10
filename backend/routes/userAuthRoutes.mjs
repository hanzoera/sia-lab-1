import express from 'express';
import { validateRegistration, validateLogin } from '../middleware/validateUser.mjs';
import { registerUser, loginUser } from '../controllers/userAuthController.mjs';

// Router object to be used for routing functionality
const router = express.Router();

router.get('/', (req, res) => {
    console.log('User hit the server.');
});

// Route for handling user registration
// 1. The middleware validateRegistration will run checks for valid user form inputs
// 2. Pass onto registerUser controller if validation passed
router.post('/register', validateRegistration, registerUser);
// Route for handling user login
// 1. The middleware validateLogin will run checks for valid user form inputs
// 2. Pass onto loginUser controller if validation passed
router.post('/login', validateLogin, loginUser);

export default router;