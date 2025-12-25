const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- MONGODB CONNECTION ---
const MONGO_URI = "mongodb+srv://karunbinny_db_user:karun123@cluster0.jx2revg.mongodb.net/amazon-clone?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

// --- SCHEMA & MODEL ---
const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  rating: Number,
  image: String,
  category: String
});

const Product = mongoose.model('Product', productSchema);

// --- ROUTES ---

// 1. GET ALL PRODUCTS
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. ADD NEW PRODUCT
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. UPDATE PRODUCT 
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. DELETE PRODUCT
app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 5. SEED DATA ROUTE
app.post('/api/seed', async (req, res) => {
  res.json({ message: "Seed route is currently disabled for safety." });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));