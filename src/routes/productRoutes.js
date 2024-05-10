
const express = require('express');
const router = express.Router();
const { upload } = require('../config/multerConfig');
const Product = require('../models/Product');

router.post('/add', upload.array('images', 4), async (req, res) => {
  try {
    if (!req.files.length) {
      return res.status(400).json({ message: "At least one image is required." });
    }
    const { name, description, price, category, subcategory } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      subcategory,
      images: req.files.map(file => file.path)
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
