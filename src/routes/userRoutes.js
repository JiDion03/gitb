const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Token = require('../models/Token');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');

// User registration
router.post('/', async (req, res) => {
    const { lastName, firstName, email, phoneNumber, password } = req.body;

    console.log('Register request received:', req.body);

    if (!firstName || !lastName || !email || !password) {
        console.log('Missing required fields');
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            console.log('User already exists with email:', email);
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Hashed password:', hashedPassword);

        user = new User({
            lastName,
            firstName,
            email,
            phoneNumber,
            password: hashedPassword
        });

        await user.save();
        console.log('User created:', user);

        const token = new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex')
        });
        await token.save();
        console.log('Token created:', token);

        const verificationUrl = `${process.env.BASE_URL}/verify/${user._id}/${token.token}`;
        console.log('Verification URL:', verificationUrl);

        await sendEmail(user.email, "Verify Email", `Please verify your email by clicking the link: ${verificationUrl}`);
        console.log('Verification email sent to:', user.email);

        res.status(201).json({ message: 'User registered, verification email sent', userId: user._id });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// New route to handle email verification via POST request
router.post('/verify/:userId/:token', async (req, res) => {
    try {
      const { userId, token } = req.params;
  
      console.log('Verification request received:', req.params);
  
      const tokenDoc = await Token.findOne({ userId, token });
      if (!tokenDoc) {
        console.log('Invalid or expired token');
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        console.log('User not found');
        return res.status(400).json({ message: 'User not found' });
      }
  
      user.verified = true; // This line updates the user's verified status to true
      await user.save(); // This line saves the updated user document to the database
      console.log('User verified:', user);
  
      await tokenDoc.remove(); // This line removes the token document from the database
      console.log('Token removed');
  
      res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      console.error('Error verifying email:', error);
      res.status(500).json({ message: 'Error verifying email', error });
    }
  });

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found with email:', email);
        return res.status(404).json({ message: 'User not found' });
      }
      if (!user.verified) {
        console.log('User not verified:', email);
        return res.status(400).json({ message: 'Please verify your account. Check your email.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Invalid credentials for email:', email);
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ message: "Login successful", user: { id: user._id, email: user.email }, token });
    } catch (error) {
      console.error('Server error during login:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

// Get user by ID
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            console.log(`No user found with ID: ${req.params.userId}`);
            return res.status(404).json({ message: 'User not found' });
        }
        const userData = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber
        };
        res.json(userData);
    } catch (error) {
        console.error(`Error fetching user from database: ${error}`);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
