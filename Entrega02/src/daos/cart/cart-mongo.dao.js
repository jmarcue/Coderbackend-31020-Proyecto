import { connection } from "../../config/mongo.config.js";
import { cartModel } from "../../models/cart.model.js";
import { productModel } from "../../models/product.model.js";
import cartMongoContainer from "../../containers/mongo/cart-mongo.container.js";

class cartMongoDao extends cartMongoContainer {
  constructor() {
    super(connection, cartModel, productModel);
  };
};

export default cartMongoDao;