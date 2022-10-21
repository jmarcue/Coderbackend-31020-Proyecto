import { logger } from '../utils/winston.util.js';
import { Storage }  from "../daos/index.js";

const storage = Storage().product;

const getAllProducts = async(req, res) => {
  try {
    let allProducts = await storage.getAll();
    return res.json(allProducts);
  }
  catch(err) {
    const msgError = `Codigo error: ${err.code} | Error al obtener todos los productos${err}`; 
    logger.info.error(msgError);      
    return res.status(404).json({ error: msgError });
  }
}

const getProductById = async(req, res) => {
  let msgError = '';
  try {
    let productbyId = await storage.getById(req.params.id);

    if (!productbyId) {
      msgError = 'Error producto no encontrado'; 
      logger.info.error(msgError); 
      return res.status(404).json({ error: msgError });
    }
    else {
      return res.json(productbyId);
    }
  }
  catch (err) {
    msgError = `Codigo error: ${err.code} | Error al obtener el producto por id: ${err}`; 
    logger.info.error(msgError); 
    return res.status(404).json({ error: msgError });
  }
}

const addProduct = async(req, res) => {
  try {
    const date = new Date().toDateString();
    const title = req.body.title;
    const code = req.body.code;
    const description = req.body.description;
    const price = Number(req.body.price);
    const stock = Number(req.body.stock);
    const thumbnail = req.body.thumbnail;
    
    const newProduct = {
      timestamp: date,
      title: `${title}`,
      code: code,
      description: `${description}`,
      price: price,
      stock: stock,
      thumbnail: `${thumbnail}`
    };

    const id = await storage.save(newProduct);

    return res.json(`Se agrego el producto: ${id}`);
  }
  catch(err) {
    const msgError = `Codigo error: ${err.code} | Error al crear un producto: ${err}`; 
    logger.info.error(msgError);     
    return res.status(404).json({ error: msgError });
  }
}

const updateProductById = async(req, res) => {
  try {
    const idProduct = req.params.id;
    const date = new Date().toDateString();
    const title = req.body.title;
    const code = Number(req.body.code);
    const description = req.body.description;
    const price = Number(req.body.price);
    const stock = Number(req.body.stock);    
    const thumbnail = req.body.thumbnail;
    
    await storage.updateById(idProduct, date, title, code, description, price, stock, thumbnail);
    return res.json('Se actualizó el producto');
  }
  catch (err) {
    const msgError = `Codigo error: ${err.code} | Error al actualizar un producto ${err}`; 
    logger.info.error(msgError); 
    return res.status(404).json({ error: msgError });
  }
}

const deleteProductById = async(req, res) => {
  try {
    const id = req.params.id;
    await storage.deleteById(id);
    return res.json(`Se eliminó de forma correcta el Id: ${id}`);
  }
  catch(err) {
    const msgError = `Codigo error: ${err.code} | Error al borrar un producto por id ${err}`; 
    logger.info.error(msgError); 
    return res.status(404).json({ error: msgError });
  }
}

export {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById
}