import express from 'express';
import { __dirname } from "./utils/helper.util.js";
import productRoute from './routes/product.route.js';
import cartRoute from './routes/cart.route.js';

// Port.
const PORT = process.env.PORT || 8080;

// Express.
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/src/public'));
app.use(express.static(__dirname + '/files'));

// router.
app.use('/api/productos', productRoute);
app.use('/api/carrito', cartRoute);
app.use((req, res, next) => {
  res.status(404).json({ error: -2, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementado.`});
});

// conexion.
const srv = app.listen(PORT, () => {
  console.log(`Servidor escuchando puerto ${srv.address().port}`)
});

// Manejo de errores de conexión
srv.on('error', error => console.log(`error en el servidor ${error}`));