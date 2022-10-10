export default class productMongoContainer {
  constructor(mongoDB, productModel) {
    this.mongo = mongoDB;
    this.productModel = productModel;
  }

  async getAll() {
    try {
      let docs = false;
      docs = await this.productModel.find();
      if (docs) {
        return docs;
      }
      else {
        return false;
      }
    }
    catch (error) {
      throw Error('Error en getAll()');
    }
  }

  async getById(id) {
    try {
      let doc = false;
      doc = await this.productsModel.findOne({ _id: id }, { __v: 0 });
      
      if (doc) {
        return doc;
      }
      else {
        return false;
      }
    }
    catch (error) {
      throw Error('Error Producto no encontrado');
    }
  }

  async save(product) {
    product = new this.productModel(product);
    this.mongo
      .then(_ => product.save())
      .then(document => document)
      .catch(err => console.log(`Error: ${err.message}`));
  }

  async updateById(idProduct, date, title, code, description, price, stock, thumbnail) {
    this.mongo
      .then(_ => this.productsModel.findOne({ _id: idProduct }, { __v: 0 }))
      .then(product => {
        product.title = title;
        product.code = code;
        product.description = description;
        product.price = price;
        product.thumbnail = thumbnail;
        product.date = date;
        product.stock = stock;

        return product.save();
      })
      .catch(err => console.log(`Error: ${err.message}`))
  }
} 