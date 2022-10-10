import { Storage } from "../daos/index.js";

const storage = Storage().cart;

const getAllProductsByIdCart = async(req, res) => {
  try {
    let idCart = req.params.id;
    let productsbyId = await storage.getProductsById(idCart);

    if (productsbyId.length == 0) {
      return res.json('El carrito se encuentra vacío');
    }
    else {
      return res.json(productsbyId);
    }
  }
  catch(err) {
    return res.status(404).json({
      error: `Codigo error: ${err.code} | Error al intentar acceder a un id de producto contenido en carrito: ${err}`
    });
  }
};

const createCart = async(req, res) => {
  try {
    const id = await storage.createCart();
    return res.json('Nuevo carrito creado');
  }
  catch(err) {
    return res.status(404).json({
      error: `Codigo error: ${err.code} | Error al crear el carrito ${err}`
    });
  }
};

const addProductToCartById = async(req, res) => {
  try {
    let idCart = req.params.id;
    let idProduct = req.params.id_Prod;

    await storage.addProduct(idCart, idProduct);
    return res.json(`Se agregó el producto con id ${idProduct} al carrito con id ${idCart}`);
  }
  catch(err) {
    return res.status(404).json({
      error: `Codigo error: ${err.code} | Error al agregar un producto: ${err}`
    });
  }
};

const deleteCartById = async(req, res) => {
  try {
    const idCart = req.params.id;

    await storage.deleteCartById(idCart);
    return res.json('Se eliminó el carrito de forma correcta');
  }
  catch(err) {
    return res.status(404).json({
      error: `Codigo error: ${err.code} | Error al eliminar el carrito ${err}`
    });
  }
};

const deleteProductByIdCart = async(req, res) => {
  try {
    const idCart = req.params.id;
    const idProduct = req.params.id_prod;

    await storage.deleteProductById(idCart, idProduct);
    return res.json(`Producto  con Id: ${idProduct} del carrito con Id: ${idCart}, fue eliminado`);
  }
  catch(err) {
    return res.status(404).json({
      error: `Error al eliminar un producto específico de un carrito ${err}`
    });
  }
};

export { getAllProductsByIdCart, createCart, addProductToCartById, deleteCartById, deleteProductByIdCart }