const Wishlist = require('../models/Wishlist');

exports.getWishlist = async (req, res) => {
  try {
    const w = await Wishlist.findOne({ userId: req.user._id }).populate('products');
    res.json(w || { products: [] });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    let w = await Wishlist.findOne({ userId: req.user._id });
    if (!w) w = new Wishlist({ userId: req.user._id, products: [] });
    if (w.products.map(String).includes(productId))
      return res.status(400).json({ message: 'Already in wishlist' });
    w.products.push(productId);
    await w.save();
    res.status(201).json(w);
  } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const w = await Wishlist.findOne({ userId: req.user._id });
    if (!w) return res.status(404).json({ message: 'Wishlist not found' });
    w.products = w.products.filter(id => id.toString() !== req.params.productId);
    await w.save();
    res.json(w);
  } catch (e) { res.status(500).json({ message: e.message }); }
};
