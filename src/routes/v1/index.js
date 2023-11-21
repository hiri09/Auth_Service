const express = require('express');

const router = express.Router();

const UserController = require('../../controllers/user-controller');
const {AuthRequestValidators} = require('../../middlewares/index');
router.post(
    '/signup' ,
    AuthRequestValidators.validateUserAuth,
    UserController.create
    );
router.get(
    '/signin' ,
    UserController.signIn
    );

router.get('/isAuthenticated' , UserController.isAuthenticated);

router.get('/isAdmin' ,AuthRequestValidators.validateIsAdminRequest ,UserController.isAdmin);
router.get('/isUser/:id' , UserController.findById);
module.exports = router;