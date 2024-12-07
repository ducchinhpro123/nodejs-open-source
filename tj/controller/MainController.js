import {Person} from '../model/person.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class MainController {
        static async logout(req, res) {
                res.clearCookie('jwt');
                return res.render('login', {message: 'Goodbye!'});
        }

        static async registerForm(req, res) {
                return res.render('register', {message: ''});
        }

        static async home(req, res) {
                return res.render('home');
        }

        static async register(req, res) {
                const {username, password}= req.body;
                const person = await Person.findOne({username: username});
                if (person == null) {
                        const newPerson = new Person();
                        newPerson.username = username;

                        // Encrypted password
                        const salt = await bcrypt.genSalt(10);
                        const encyptedPassword = await bcrypt.hash(password, salt);
                        newPerson.password = encyptedPassword;
                        try {
                                await newPerson.save();
                                return res.render('register', {message: 'Registered successfully'});
                        } catch (error) {
                                res.render('register', {message: `There something went wrong: ${error}`});
                        }
                } else {
                        res.render('register', {message: `Username ${username} already taken.`});
                }
        }

        static async login(req, res) {
                return res.render('login', {message: ''});
        }

        static async loginPost(req, res) {

                const {username, password}= req.body;
                const person = await Person.findOne({username: username});
                if (person) {
                        const decodePassword = await bcrypt.compare(password, person.password);
                        if (decodePassword) {
                                // export function sign(
                                //     payload: string | Buffer | object,
                                //     secretOrPrivateKey: Secret | PrivateKey,
                                //     options?: SignOptions,
                                // ): string;
                                // jwt.sign({payload: , secretOrPrivateKey: , option: ,});
                                const payload = {
                                        user_id: person._id,
                                        username: person.username
                                };
                                try {
                                        const token = jwt.sign(payload, process.env.JWT_SECRECT, {expiresIn: '1h'});
                                        res.cookie('jwt', token, { 
                                                httpOnly: true,
                                                maxAge: 3600000,
                                        });
                                        return res.render('home');
                                } catch (error) {
                                        return res.render('fail', {message: `JWT error ${error}`});
                                }

                        } else {
                                return res.render('/login', {message: 'username or password is invalid'});
                        }
                } else {
                        return res.render('login', {message: 'Username not found'});
                }
        }
}

export default MainController;
