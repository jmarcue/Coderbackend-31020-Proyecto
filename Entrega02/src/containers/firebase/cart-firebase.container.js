export default class cartFirebaseContainer {
  constructor(queryCart, queryProduct, fieldValue) {
    this.queryCart = queryCart;
    this.queryProduct = queryProduct;
    this.fieldValue = fieldValue;  
  }

  async createCart() {
    let newCart = {
      timestamp: new Date(),
      products: []
    };
  
    await this.queryCart.add(newCart);
  }

  async getProductsById(idCart) {
    const docsCarts = await this.queryCart.doc(idCart);
    const response = await docsCarts.get();
   
    return (response.data() == null) 
      ? []
      : response.data().products;
  }

  async addProduct(idCart, idProduct) {
    const docCarts = this.queryCart.doc(idCart);
    const docProducts = this.queryProduct.doc(idProduct);
    const response = await docProducts.get();

    const product = {
        id: response.id, ...response.data()
    };

    await docCarts.update({
        products: this.fieldValue.arrayUnion(product)
    });
  }

  async deleteCartById(idCart) {
    const docsCart = this.queryCart.doc(idCart);

    await docsCart.delete();
  }

  async deleteProductById(idCart, idProduct) {
    const docProduct = this.queryProduct.doc(idProduct);
    const deleteProduct = await docProduct.get();
    const docCart = await this.queryCart.doc(idCart);
    const cart = await docCart.get();
    const allProducts = cart.data().products;

    let productDelete = {};
    allProducts.forEach(product => {
      if (product.id == deleteProduct.id) {
        productDelete = product;
      }
    });

    await docCart.update({
      products: this.FieldValue.arrayRemove(productDelete)
    });
  }
}