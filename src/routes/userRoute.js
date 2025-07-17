const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');
const formParser = require('../middleware/formParser'); // <== baru

// GET all users
router.get('/', userController.getAllUsers);
//GET all users by role
router.get('/role/:role', userController.getUserByRole);
//GET user by id
router.get('/:id_user', userController.getUserById);
// POST new user
router.post('/', formParser, userController.createUser);
// PUT update user by id_user
router.put('/:id_user', userController.updateUser);
// PUT reset password by id_user
router.put('/reset-password/:id_user', userController.resetPassword);
// DELETE user by id_user
router.delete('/:id_user', userController.deleteUser);

module.exports = router;
