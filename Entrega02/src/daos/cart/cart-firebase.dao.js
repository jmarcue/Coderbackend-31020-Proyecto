import { queryCart, queryProduct, fieldValue } from "../../config/firebase.config.js";
import cartFirebaseContainer from "../../containers/firebase/cart-firebase.container.js";

class cartFirebaseDao extends cartFirebaseContainer {
  constructor() {
    super(queryCart, queryProduct, fieldValue);
  };
};

export default cartFirebaseDao;