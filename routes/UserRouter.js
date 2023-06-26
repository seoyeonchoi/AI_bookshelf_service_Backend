import Express from "express";
import cookieParser from "cookie-parser";
import Token from "../middlewares/Token.js";

const route = Express.Router();
const UserRouter = Express.Router();

import { Addlike } from "../controllers/User/AddlikeController.js";
UserRouter.post("/addlike", route.use(cookieParser()), Addlike);

import { Deletelike } from "../controllers/User/DeletelikeController.js";
UserRouter.post("/deletelike", route.use(cookieParser()), Deletelike);

import { Likelist } from "../controllers/User/LikelistController.js";
UserRouter.post("/likelist", route.use(cookieParser()), Likelist);

export default UserRouter;
