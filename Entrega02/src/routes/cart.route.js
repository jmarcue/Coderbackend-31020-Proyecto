import Router from 'express';
import { getAllProductsByIdCart, createCart, addProductToCartById, deleteCartById, deleteProductByIdCart } from "../controllers/cart.controller.js";

const cartRoute = Router();

// POST: 'api/carrito/' => Crea un carrito y devuelve su id.
cartRoute.post('/', createCart);

// POST: 'api/carrito/:id/:id_Prod' => incorpora productos al carrito por su id de producto.
cartRoute.post('/:id/:id_Prod', addProductToCartById);

// GET: 'api/carrito/:id/productos' => listar todos los productos guardados en el carrito.
cartRoute.get('/:id/productos', getAllProductsByIdCart);

// DELETE: 'api/carrito/:id' => Vacía un carrito y lo elimina. 
cartRoute.delete('/:id', deleteCartById);

// DELETE: '/:id/productos/:id_prod' => Eliminar un producto del carrito por su id de carrito y de producto.
cartRoute.delete('/:id/productos/:id_prod', deleteProductByIdCart);

export default cartRoute;