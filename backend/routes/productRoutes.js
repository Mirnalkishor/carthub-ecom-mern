const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
  getProducts,
  getCategories,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

const upload = multer({ dest: 'uploads/' });

router.get('/', getProducts);
router.get('/categories', getCategories);  // ← must be BEFORE /:id
router.get('/:id', getProductById);
router.post('/', protect, admin, upload.single('image'), createProduct);
router.put('/:id', protect, admin, upload.single('image'), updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;