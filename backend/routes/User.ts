import express from 'express';
import { registerUser, loginUser, logout, infoUser } from '../controllers/User';
import validateUser from '../libs/validation';
import { profileUser } from '../controllers/User';
import { authorization } from '../middleware/authorization';
import { updateUser } from '../controllers/User';


const user = express.Router();

user.get("/info",authorization, infoUser)
user.post("/register", validateUser, registerUser);
user.post("/login", loginUser);
user.post("/logout", logout);
user.post("/profile", authorization, profileUser);
user.put("/profile", authorization, updateUser);

export default user