import { logger } from './utils/winston.util.js';
import userModel from '../models/user.model.js';

class userController {
  async findById(id) {
    try {
      const response = await userModel.findById(id);
      return response || false;
    } 
    catch (error) {
      logger.error(error)
    }
  }
}

export default userController;