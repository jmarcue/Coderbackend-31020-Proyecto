const homeController = (req, res) => {
  return res.render('index');
}

const signupController = (req, res) => {
  return res.render('signup');
}

const welcomeController = (req, res) => {
  userLog = req.user;
  return res.render('welcome', { userLog });
}

const formAddProductController = (req, res) => {
  return res.render('productsAdmin');
}

const errorController = (req, res) => {
  msgError = req.params.msg;
  return res.render('viewError');
}

export {
  homeController,
  signupController,
  welcomeController,
  formAddProductController,
  errorController
};