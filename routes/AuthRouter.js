import express from "express";
import PasswordHash from "../middlewares/HashPassword.js";

const AuthRouter = express.Router();

import { SignUp } from "../controllers/SignupController.js";
AuthRouter.post("/signup", PasswordHash, SignUp);

import { SignIn } from "../controllers/SigninController.js";
AuthRouter.post("/signin", PasswordHash, SignIn);

export default AuthRouter;
