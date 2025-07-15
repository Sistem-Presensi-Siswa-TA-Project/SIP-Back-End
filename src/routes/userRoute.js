const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');

// GET all users
router.get('/', userController.getAllUsers);

// POST new user
router.post('/', userController.createUser);

// PUT update user by id_user
router.put('/:id_user', userController.updateUser);

// DELETE user by id_user
router.delete('/:id_user', userController.deleteUser);

module.exports = router;