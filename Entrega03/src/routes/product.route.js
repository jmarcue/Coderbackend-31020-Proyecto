import express from 'express';
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
} from '../controllers/cart.controller.js';

const router = express.Router();

router.get(`/`, getAllProducts);
router.get(`/:id`, getProductById);
router.post(`/`, addProduct);
router.put(`/:id`, updateProductById);
router.delete(`/:id`, deleteProductById);

router.delete('/:id', deleteCartById);

export default router;