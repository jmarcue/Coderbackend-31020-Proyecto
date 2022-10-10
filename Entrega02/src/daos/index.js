import { serverEnvironment } from "../config/server.config.js";
import cartFileDao from "./cart/cart-file.dao.js";
import cartMongoDao from "./cart/cart-mongo.dao.js";
import cartFirebaseDao from "./cart/cart-firebase.dao.js";
import productFileDao from "./product/product-file.dao.js";
import productMongoDao from "./product/product-mongo.dao.js";
import productFirebaseDao from "./product/product-firebase.dao.js";

const getStorage = () => {
  const storageType = serverEnvironment.STORAGE;
  switch (storageType) {
    case 'firebase':
        return {
            product: new productFirebaseDao(),
            cart: new cartFirebaseDao()
        }
        break;
    case 'mongo':
        return {
            product: new productMongoDao(),
            cart: new cartMongoDao()
        }
        break;
    case 'file':
        return {
            product: new productFileDao(),
            cart: new cartFileDao()
        }
        break;
    default:
        return {
            product: new productFirebaseDao(),
            cart: new cartFirebaseDao()
        }
        break;
  }
}

export { getStorage as Storage }