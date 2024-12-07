import express from 'express';
import MainController from '../controller/MainController.js';
import {verifyToken} from '../middlewarer/auth.js'


export const router = express.Router();

router.get("/login", MainController.login);
router.post("/login", MainController.loginPost);
router.post("/register", MainController.register);
router.get("/register", MainController.registerForm);
router.get("/home", verifyToken, MainController.home);

router.get("/logout", verifyToken, MainController.logout);


