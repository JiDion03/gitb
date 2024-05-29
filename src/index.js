const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const statsRoutes = require('./routes/statsRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));

app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send('Hello from Express backend!');
});


const dbURI = process.env.DB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected…'))
  .catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
