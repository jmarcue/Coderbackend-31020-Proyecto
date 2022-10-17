import userController from './user.controller.js';

class homeController {

  async getData(req, res) {
    let user;
    
    if (req.session.passport?.user) {
      const userId = req.session.passport.user;
      user = await userController.findById(userId);
      user = user.name;
    }
    res.render("home", { user });
  }
}

export default homeController;