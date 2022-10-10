import { isEmptyObject, getMaxId } from "../../utils/helper.util.js";

export default class cartFileContainer {
  constructor(path, fs) {
    this.path = path;
    this.fs = fs;
  }

  async setData(data) {
    return await this.fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
  } 

  async getData() {
    return await this.fs.promises.readFile(this.path, "utf-8");
  } 

  async getParseData() {
    const obj = await this.getData();
    return (!isEmptyObject(obj)) ? JSON.parse(obj) : [];
  }   

  async readOrCreateFile() {
    try {
      await this.getData();
    }
    catch (err) {      
      err.code === "ENOENT"
        ? this.setData([])
        : console.log(`Codigo error: ${err.code} | Error al intentar crear archivo: ${this.path}`);                      
    }
  }

  async read() {
    try {
      await this.readOrCreateFile();
      return await this.getParseData();
    }
    catch(err) {
      throw Error(`Error al leer el archivo ${err}`);
    }
  }

  async write(data, msg) {
    try {
      await this.setData(data);
      console.log(msg);
    }
    catch (err) {
      throw Error(`Error al escribir en el archivo ${err}`);
    }
  }

  async getAll() {
    return await this.read();
  }
  
  async getCartById(id) {
    let fileData = await this.read();
    return fileData.filter(cart => cart.id == id);
  }  

  async createCart() {
    let newCart = {};
    let cart = {
      id: 0,
      timestamp: new Date().toDateString(),
      products: []
    };

    let fileData = await this.read();

    if (isEmptyObject(fileData)) {
      cart.id = 1;
      newCart = cart;
    }
    else {
      cart.id = getMaxId(fileData) + 1;
      newCart = cart;
    }

    fileData.push(newCart);
    await this.write(fileData, 'datos agregados');

    return cart.id;
  }

  async getProductsById(idCart) {
    let fileData = await this.read();
    let result = fileData.filter(cart => cart.id == idCart);
    if (result.length == 0) {
      return [];
    }
    else {
      return result[0].products;
    }
  }

  async deleteAll() {
    await this.write([], 'Se eliminaron todos los productos');
  }

  async deleteCartById(idCart) {
    try {
      let fileData = await this.read();
      let cart = fileData.find(cart => cart.id == idCart);

      if (cart) {
        let index = fileData.indexOf(cart);
        fileData.splice(index, 1);
        await this.write(fileData, `Carrito con Id: ${idCart} eliminado`);
      }
      else {
        throw Error(`El carrito con id ${idCart} no existe`);
      }
    }
    catch(err) {
      throw Error(`Error ${err}`);
    }
  }

  async deleteProductById(idCart, idProduct) {
    try {
      let fileData = await this.read();
      
      let cart     = fileData.find(cart => cart.id == idCart);
      if (!cart) {
        throw Error('Error el carrito no existe');
      }

      let product  = cart.products.find(product => product.id == idProduct);      
      if (!product) {
        throw Error('Error el producto no existe');
      }

      let indexProduct = cart.products.indexOf(product);
      cart.products.splice(indexProduct, 1);
      await this.write(fileData, `Producto con Id: ${idProduct} del carrito con Id ${idCart} fue eliminado`);
    }
    catch(err) {
      throw Error(`Error ${err}`);
    }
  }

  async addProduct(idCart, idProduct) {
    try {
      let fileData = await this.read();    
      let cart = fileData.find(cart => cart.id == idCart);

      if (!cart) {
        throw (`el carrito con id ${idCart} no existe`);
      }
      
      let product  = cart.products.find(product => product.id == idProduct);
      
      if (product) {
        throw (`el producto con id ${idProduct} existe`);
      }           

      cart.products.push({ id: idProduct });
      await this.write(fileData, `Carrito con Id: ${idCart} agregado nuevo producto`);     
    }
    catch (err) {
      throw Error(`Error ${err}`);
    }
  }



}