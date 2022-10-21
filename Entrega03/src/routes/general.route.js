import express from 'express';
import {
  homeController,
  signupController,
  welcomeController,
  formAddProductController,
  errorController
} from '../controllers/general.controller.js';

const router = express.Router();

const isLogged = ((req, res, next) => {
  let msgError = 'Para acceder a esta URL debe iniciar sesión';
  if (req.user) {
    next();
  }
  else {
    return res.render('viewError', { msgError });
  }
});

router.get('/', homeController);
router.get('/signup', signupController);
router.get('/welcome', isLogged, welcomeController);
router.get('/formAddProduct', isLogged, formAddProductController);
router.get('/error/:msg', errorController);

export default router;