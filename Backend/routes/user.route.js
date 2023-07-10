const express = require('express');
const User =  require('../models/user.model');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const userRouter = express.Router()
require('dotenv').config()
userRouter.get("/",(req,res)=>{
    res.send("Welcome to user section!")
})

// Register user
userRouter.post('/api/register', async (req, res) => {
    try {
        const { name, email, password, address } = req.body;
    
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create new user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            address
        });
    
        await user.save();
    
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
});
  
  // User login
userRouter.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    
        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.secret);
    
        return res.status(201).json({"message":"User login Successfully", token });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
});
  
  // Reset user password
userRouter.put('/api/user/:id/reset', async (req, res) => {
    try {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;
    
        // Find user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        // Compare current password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid current password' });
        }
    
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
    
        // Update user password
        user.password = hashedPassword;
        await user.save();
    
        return res.status(204).json({"message":"password reset successfully"});
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = {userRouter}