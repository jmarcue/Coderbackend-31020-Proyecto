import Router from 'express';
import { getAllProducts, getProductById, addProduct, updateProductById, deleteProductById } from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const productRoute = Router();

// POST => api/productos
productRoute.post('/', authMiddleware, addProduct);

// GET => api/productos
productRoute.get('/', getAllProducts);

// GET => api/productos/:id
productRoute.get('/:id', getProductById);

// router PUT => api/productos/:id
productRoute.put('/:id', authMiddleware, updateProductById);

// router DELETE => api/productos/:id
productRoute.delete('/:id', authMiddleware, deleteProductById);

export default productRoute;