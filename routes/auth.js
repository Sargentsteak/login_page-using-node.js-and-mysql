const { Router } = require("express");
const express = require ("express");
const router = express.Router();
const authController = require('../controllers/auth');
        
router.post('/register', authController.register);

router.post('/views/login ' , authController.login);
module.exports= router;
