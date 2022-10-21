import { connection } from "../../configs/mongo.config.js";
import { cartModel } from "../../models/cart.model.js";
import { productModel } from "../../models/product.model.js";
import { userModel } from "../../models/user.model.js";
import cartMongoContainer from "../../containers/mongo/cart-mongo.container.js";

class cartMongoDao extends cartMongoContainer {
  constructor() {
    super(connection, cartModel, productModel, userModel);
  };
};

export default cartMongoDao;