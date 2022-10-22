import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { serverConfig } from './configs/server.config.js';
import { sessionConfig } from './configs/session.config.js';
import { mongoConnect } from './configs/mongo.config.js';
import { __dirname, __dirJoin } from './utils/helper.util.js';
import { isLogged } from './Middlewares/auth.middleware.js';
import { logger } from './utils/winston.util.js';
import { 
  cartRoute,
  generalRoute,
  loginRoute,
  logoutRoute,
  singupRoute,
  profileRoute,
  orderRoute,
  productRoute
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

//ejs
app.set('view engine', 'ejs');
app.set('views', __dirJoin(__dirname, '../views'));


// router.
app.use('/', generalRoute);
app.use('/api/product', isLogged, productRoute);
app.use('/api/cart', isLogged, cartRoute);
app.use('/api/order', isLogged, orderRoute);
app.use('/login', loginRoute);
app.use('/signup', singupRoute);
app.use('/logout', isLogged, logoutRoute);
app.use('/profile', isLogged, profileRoute);


// server connection
const server = app.listen(PORT, () => {
  logger.info.info(`Servidor http en puerto: ${server.address().port}`);
});
server.on("error", error => logger.info.error(`Error en servidor ${error}`));