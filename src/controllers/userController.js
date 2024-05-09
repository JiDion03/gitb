const User = require('../models/User'); 

const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
    try {
        const { username, email, password, roles } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = new User({ username, email, password: hashedPassword, roles });
        await newUser.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

