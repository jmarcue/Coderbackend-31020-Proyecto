import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';

import { serverConfig } from './configs/server.config.js';
import { sessionConfig } from './configs/session.config.js';
import { mongoConnect } from './configs/mongo.config.js';
import { handlebar } from './configs/handlebars.config.js';
import { __dirname, __dirJoin } from './utils/helper.util.js';
import { logger } from './utils/winston.util.js';
import { 
  homeRoute
} from './routes/index.js';


// Server 
const app = express();
const PORT = serverConfig.PORT;

// DB Connection.
await mongoConnect();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirJoin(__dirname, './public')));
app.use(express.static(__dirJoin(__dirname, './files')));

app.use(cookieParser());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

// hbs
app.engine('hbs', engine(handlebar));
app.set('view engine', 'hbs');
app.set('views', __dirJoin(__dirname, '../views'));

// router.
app.use("/", homeRoute);
//app.use('/api/productos', productRoute);
//app.use('/api/carrito', cartRoute);


// server connection
const server = app.listen(PORT, () => {
  logger.info.info(`Servidor http en puerto: ${server.address().port}`);
});
server.on("error", error => logger.info.error(`Error en servidor ${error}`));