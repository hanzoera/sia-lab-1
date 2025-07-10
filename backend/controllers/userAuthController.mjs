import { createUser, findUserbyUsername } from "../models/userModel.mjs";
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    // Destructure request body into variables
    const { 
        username,
        email, 
        password 
    } = req.body;
    
    console.log('Incoming request body:', req.body);
    
    try {
        // Check if username already exists
        const existingUser = await findUserbyUsername(username);
        if (existingUser !== null) {
            return res.status(400).json({ msg : 'Username already taken' });
        }

        // Password hashing stage
        const hashedPassword = await bcrypt.hash(password, 10);

        // Finally call the model where it would query the valid registration
        const newUser = await createUser(username, email, hashedPassword);
        
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
    // Destructure request body into variables
    const {
        username,
        password
    } = req.body;

    try {
        // Check if username do not exist and if the passwords do not match 
        const existingUser = await findUserbyUsername(username);
        if (!existingUser) {
            return res.status(401).json({ msg : 'This account does not exist.' });
        }
        
        // Compare password hashes for validation
        const isMatched = await bcrypt.compare(password, existingUser.password);
        if (!isMatched) {
            return res.status(400).json({ msg : 'Invalid username or password.' })
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