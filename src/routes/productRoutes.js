
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


router.get('/filter', async (req, res) => {
  console.log("Received filter parameters:", req.query);
  const { category, subcategory, priceMin, priceMax } = req.query;
  let query = {};
  if (category) query.category = category;
  if (subcategory) query.subcategory = subcategory;
  if (priceMin) query.price = { ...query.price, $gte: Number(priceMin) };
  if (priceMax) query.price = { ...query.price, $lte: Number(priceMax) };
  try {
      const products = await Product.find(query);
      console.log("Sending filtered products:", products);
      res.json(products);
  } catch (error) {
      console.error("Error fetching filtered products:", error);
      res.status(500).send("Error on fetching products: " + error);
  }
});

module.exports = router;
