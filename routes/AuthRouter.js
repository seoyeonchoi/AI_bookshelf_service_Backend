import Express from "express";
import PasswordHash from "../middlewares/HashPassword.js";
import Token from "../middlewares/Token.js";
import cookieParser from "cookie-parser";

const route = Express.Router();
const AuthRouter = Express.Router();

import { SignUp } from "../controllers/Auth/SignupController.js";
AuthRouter.post("/signup", PasswordHash, SignUp);

import { SignIn } from "../controllers/Auth/SigninController.js";
AuthRouter.get("/signin", PasswordHash, Token, SignIn);

import { SignOut } from "../controllers/Auth/SignoutController.js";
AuthRouter.get("/signout", SignOut);

import { AuthToken } from "../controllers/Auth/AuthTokenController.js";
AuthRouter.get("/authtoken", route.use(cookieParser()), AuthToken);

export default AuthRouter;
