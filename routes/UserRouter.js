import Express from "express";
import cookieParser from "cookie-parser";
import Token from "../middlewares/Token.js";

const route = Express.Router();
const UserRouter = Express.Router();

import { Addlike } from "../controllers/User/Like/AddlikeController.js";
UserRouter.post("/addlike", route.use(cookieParser()), Addlike);

import { Deletelike } from "../controllers/User/Like/DeletelikeController.js";
UserRouter.post("/deletelike", route.use(cookieParser()), Deletelike);

import { Likelist } from "../controllers/User/Like/LikelistController.js";
UserRouter.post("/likelist", route.use(cookieParser()), Likelist);

import { LikeBooklist } from "../controllers/User/Like/LikeBookListController.js";
UserRouter.post("/likebooklist", route.use(cookieParser()), LikeBooklist);

import { Addcart } from "../controllers/User/Cart/AddcartController.js";
UserRouter.post("/addcart", route.use(cookieParser()), Addcart);

import { Deletecart } from "../controllers/User/Cart/DeletecartController.js";
UserRouter.post("/deletecart", route.use(cookieParser()), Deletecart);

import { Cartlist } from "../controllers/User/Cart/CartlistController.js";
UserRouter.post("/cartlist", route.use(cookieParser()), Cartlist);

import { CartBooklist } from "../controllers/User/Cart/CartBookListController.js";
UserRouter.post("/cartbooklist", route.use(cookieParser()), CartBooklist);

export default UserRouter;
