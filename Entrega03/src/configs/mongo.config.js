import mongoose from 'mongoose';

import { serverConfig } from './server.config.js';
import { logger } from '../utils/winston.util.js';

export default class mongoConnect {
  constructor() {
      this.connection = this.createConnection(serverConfig.STORAGE);
  }

  createConnection(typeStorage) {
    if (typeStorage == 'local') {
      const uri = serverConfig.MONGO_LOCAL;
      const options = { useNewUrlParser: true, useUnifiedTopology: true }
      mongoose.connect(uri, options).then(
        ()  => { logger.info.info(`Conectado a mongoDB local`) },
        err => { logger.info.error(`Ocurrió un error al conectarse a la base de datos de mongodb: ${err}`) });
    }
    else if (typeStorage == 'cloud') {
      const uri = serverConfig.MONGO_ATLAS;      
      const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
      mongoose.connect(uri, options).then(
        ()  => { logger.info.info(`Conectado a MongoDB Cloud`) },
        err => { logger.info.error(`Ocurrió un error al conectarse a la base de datos de mongodb: ${err}`) }
      );
    }
    else{
      logger.info.error('ingresar parametro base datos');
    }
  }
}