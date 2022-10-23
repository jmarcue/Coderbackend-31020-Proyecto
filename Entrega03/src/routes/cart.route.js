import express from 'express';
import {
  getAllProductsByIdCart,
  createCart,
  viewCart,
  addProductToCart,
  deleteCartById,
  deleteProductById,
} from '../controllers/cart.controller.js';

const router = express.Router();

router.get('/:id/products', getAllProductsByIdCart);
router.get('/', viewCart);
router.post('/', createCart);
router.post('/addProduct', addProductToCart);
router.post('/deleteProduct', deleteProductById);

//router.post('/:idCar/:idProd', addProductToCart);
//router.delete('/:id/products/:id_prod', deleteProductById);

router.delete('/:id', deleteCartById);

export default router;