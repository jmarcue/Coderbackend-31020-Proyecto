import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// ruta directorio.
const __dirname = dirname(fileURLToPath(import.meta.url));

// estructura para mensajes
const returnMessage = (isError, message, payload) => {
  return { status: isError ? "error" : "success", message, payload };
}

// verifica si es un objeto vacio
const isEmptyObject = (obj) => {        
  return (obj == null) 
    ? true
    : Object.entries(obj).length === 0;
}

// obtiene el maximo id desde el objeto
const getMaxId = (obj) => {
  return (!isEmptyObject(obj))
    ? obj.reduce((prev, curr) => {return (prev = prev > curr.id ? prev : curr.id);}, 0)
    : 0;
}

export { __dirname, join as __dirJoin, returnMessage, isEmptyObject, getMaxId }