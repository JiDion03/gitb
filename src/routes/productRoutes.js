const express = require('express');
const router = express.Router();
const { upload } = require('../config/multerConfig');
const Product = require('../models/Product');
const authenticate = require('../middleware/authenticate');

router.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
      const products = await Product.find({ name: { $regex: query, $options: 'i' } }); // Case-insensitive search
      res.json(products);
  } catch (error) {
      res.status(500).json({ message: 'Error searching products', error });
  }
});

router.post('/add', authenticate, upload.array('images', 4), async (req, res) => {
  try {
    const { name, description, price, category, subcategory } = req.body;
    const imagePaths = req.files.map(file => `uploads/${file.filename}`); // Store relative path

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      subcategory,
      images: imagePaths,
      userId: req.user.id // Assuming the authenticated user ID is available
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Failed to add product:', error);
    res.status(400).json({ message: 'Failed to add product', error: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const products = await Product.find({ userId: req.params.userId });
    res.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(400).json({ message: 'Failed to fetch products', error: error.message });
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

router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
      const products = await Product.find({ name: { $regex: query, $options: 'i' } }); // Case-insensitive search
      res.json(products);
  } catch (error) {
      res.status(500).json({ message: 'Error searching products', error });
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

router.get('/:productId', async (req, res) => {
  try {
      const product = await Product.findById(req.params.productId);
      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
