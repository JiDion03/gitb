const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); 

router.post('/', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        console.error('Error adding new item:', error);
        res.status(400).json({ message: "Error adding new item", error: error.message, details: error.errors });
    }
});

module.exports = router;
