import mongoose from 'mongoose';
import { serverConfig } from './server.config.js';

export default class mongoConnect {
  constructor() {
      this.connection = this.createConnection(serverConfig.STORAGE);
  }

  createConnection(typeStorage) {
    if (typeStorage == 'local') {
      const uri = serverConfig.MONGO_LOCAL;
      const options = { useNewUrlParser: true, useUnifiedTopology: true }
      mongoose.connect(uri, options).then(
        () => { console.log('Conectado a MongoDB local') },
        err => { err });
    }
    else if (typeStorage == 'cloud') {
      const uri = serverConfig.MONGO_ATLAS;      
      const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
      mongoose.connect(uri, options).then(
        () => { console.log('Conectado a MongoDB Cloud') },
        err => { err }
      );
    }
    else{
      console.log('ingresar parametro bd');
    }
  }
}