import fs from "fs";
import { __dirname, __dirJoin } from "../../utils/helper.util.js";
import cartFileContainer from "../../containers/file/cart-file.container.js";

class cartFileDao extends cartFileContainer {
  constructor() {
    super(__dirJoin(__dirname, '../../files', 'cart.json'), fs);
  };
};

export default cartFileDao;