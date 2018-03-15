const express = require(`express`);
const Router = express.Router();
const passport = require(`passport`);

const userController = require(`../controller/userController`)();

const userRoutes = ()=>{

    Router.route(`/`)
    .get(userController.login_get)
    .post(passport.authenticate(`local`, {failureRedirect: `/`}), userController.login_post);

    Router.route(`/home`)
    .all(userController.is_user)
    .get(userController.home);

    return Router;
}

module.exports = userRoutes;