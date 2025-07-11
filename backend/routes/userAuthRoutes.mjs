import express from 'express';
// Middleware imports
import { validateRegistration, validateLogin } from '../middleware/validateUser.mjs';
import { isAuthenticated, isCustomer, isAdmin } from '../middleware/checkRole.mjs';
// Controller imports
import { registerUser, loginUser } from '../controllers/userAuthController.mjs';

// Router object to be used for routing functionality
const router = express.Router();

router.get('/', (req, res) => {
    console.log(`A User hit the server from: ${req.ip}`);
    res.send('Sample server send response.');
});

// testing only
router.get('/session-check', (req, res) => {
    if (req.session.user) {
        return res.json({ loggedIn: true, user: req.session.user });
    } else {
        return res.status(401).json({ loggedIn: false, msg: 'Not authenticated.' });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ msg: 'Logout failed' });
        }
        res.clearCookie('connect.sid');

        return res.json({
            msg: 'Logged out successfully.'
        });
    });
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