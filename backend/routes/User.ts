import express from 'express';
import { registerUser, loginUser, logout, infoUser } from '../controllers/User';
import validateUser from '../libs/validation';


const user = express.Router();

user.get("/info", infoUser)
user.post("/register", validateUser, registerUser);
user.post("/login", loginUser);
user.post("/logout", logout);

export default user