import { createUser, findUserbyUsername } from '../models/userModel.mjs';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    console.log('[registerUser : controller] start');
    
    // Destructure request body into variables
    const { 
        username,
        email, 
        password 
    } = req.body;
    
    try {
        // Check if username already exists
        const existingUser = await findUserbyUsername(username);
        if (existingUser !== null) {
            console.log('[registerUser : controller] the username is already taken');

            return res.status(400).json({ msg : 'Username already taken' });
        }
        
        console.log('[registerUser : controller] passed username-taken(findUserbyUsername) validation.');

        // Password hashing stage
        const hashedPassword = await bcrypt.hash(password, 10);

        // Finally call the model where it would query the valid registration
        await createUser(username, email, hashedPassword);
        
        console.log('[registerUser : controller] passed createUser query function.');

        // Return a message indicating successful creation of entry 
        return res.status(201).json({
            msg : 'Registration successful.' 
        });
    } catch (error) {
        console.log(`Registration Error: ${error}`);
        return res.status(500).json({
            msg : 'Internal server error during registration.'
        });
    }
};

export const loginUser = async (req, res) => {
    console.log('[loginUser : controllers] start');

    // Destructure request body into variables
    const {
        username,
        password
    } = req.body;

    try {
        // Check if username do not exist and if the passwords do not match 
        const existingUser = await findUserbyUsername(username);
        if (!existingUser) {
            console.log('[loginUser : controller] the account does not exist.');

            return res.status(400).json({ msg : 'This account does not exist.' });
        }

        console.log('[loginUser : controller] passed username-exist(findUserbyUsername) validation.');

        // Compare password hashes for validation
        const isMatched = await bcrypt.compare(password, existingUser.password);
        if (!isMatched) {
            console.log('[loginUser : controller] hashed-password comparison does not match.');

            return res.status(400).json({ msg : 'Invalid username or password.' })
        }

        console.log('[loginUser : controller] passed hashed-password comparison validation.');
        
        req.session.user = {
            id : existingUser.id,
            username : existingUser.username,
            role : existingUser.role
        }

        // Return a message indicating successful login 
        return res.status(200).json({
            msg : 'Login successful'
        });
    } catch (error) {
        console.log(`Login Error: ${error}`);
        return res.status(500).json({ msg : 'Internal server error during login.' });
    } 
    
};