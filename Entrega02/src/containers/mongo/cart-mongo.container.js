export default class cartMongoContainer {
  constructor(mongo, cartModel, productModel) {
    this.mongo = mongo;
    this.cartModel = cartModel;
    this.productModel = productModel;
  }

  async createCart() {
    let newCart = {
        timestamp: new Date(),
        products: []
    };

    const cart = new this.cartModel(newCart);
    
    this.mongo
      .then(_ => cart.save())
      .then(document => document._id.toString())
      .catch(err => console.log(`Error: ${err.message}`));
  }

  async getProductsById(idCart) {
    let docs = false
    docs = await this.cartModel.findOne({ _id: idCart }, { __v: 0 });
    if (docs) {
      return docs.products;
    }
    else {
      return false;
    }
  }

  async addProduct(idCart, idProduct) {
    let docCart = false;
    let docProduct = false
    
    docCart = await this.cartModel.findOne({ _id: idCart }, { __v: 0 });
    docProduct = await this.productModel.findOne({ _id: idProduct }, { __v: 0 });

    if (docCart && docProduct) {
      docCart.products.push(docProduct);
      return docCart.save();
    }
    else {
      throw Error('Error al acceder al id del carrito / producto');
    }
  }  

  async deleteCartById(idCart) {
    this.mongo
      .then(_ => this.cartModel.deleteOne({
        _id: idCart
      }))
      .then(result => console.log(result))
      .catch(err => console.log(`Error: ${err.message}`))
  }  

  async deleteProductById(idCart, idProduct) {
    let docCart = false;
    let docProduct = false
    
    docCart = await this.cartModel.findOne({ _id: idCart }, { __v: 0 });
    docProduct = await this.productModel.findOne({ _id: idProduct }, { __v: 0 });

    if (docCart && docProduct) {
        let allProducts = docCart.products;
        let products = [];

        for (let i = 0; i <= allProducts.length - 1; i++) {
            if (allProducts[i]._id.toString() != docProduct._id.toString()) {
                products.push(allProducts[i]);
            }
        }
        docCart.products = products;
        return docCart.save();
    } 
    else {
      throw Error('Error al acceder al id del carrito / producto');
    }
  }  
}