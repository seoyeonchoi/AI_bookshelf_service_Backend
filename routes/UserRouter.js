import Express from "express";
import cookieParser from "cookie-parser";
import Token from "../middlewares/Token.js";

const route = Express.Router();
const UserRouter = Express.Router();

import { AddLike } from "../controllers/User/Like/AddLikeController.js";
UserRouter.post("/addlike", route.use(cookieParser()), AddLike);

import { DeleteLike } from "../controllers/User/Like/DeleteLikeController.js";
UserRouter.post("/deletelike", route.use(cookieParser()), DeleteLike);

import { LikeCheck } from "../controllers/User/Like/LikeCheckController.js";
UserRouter.post("/likecheck", route.use(cookieParser()), LikeCheck);

import { LikeList } from "../controllers/User/Like/LikeListController.js";
UserRouter.post("/likelist", route.use(cookieParser()), LikeList);

import { AddCart } from "../controllers/User/Cart/AddCartController.js";
UserRouter.post("/addcart", route.use(cookieParser()), AddCart);

import { DeleteCart } from "../controllers/User/Cart/DeleteCartController.js";
UserRouter.post("/deletecart", route.use(cookieParser()), DeleteCart);

import { CartCheck } from "../controllers/User/Cart/CartCheckController.js";
UserRouter.post("/cartcheck", route.use(cookieParser()), CartCheck);

import { CartList } from "../controllers/User/Cart/CartListController.js";
UserRouter.post("/cartlist", route.use(cookieParser()), CartList);

import { AllAddBookshelf } from "../controllers/User/Bookshelf/AllAddBookshelfController.js";
UserRouter.post("/alladdbookshelf", route.use(cookieParser()), AllAddBookshelf);

import { AddBookshelf } from "../controllers/User/Bookshelf/AddBookshelfController.js";
UserRouter.post("/addbookshelf", route.use(cookieParser()), AddBookshelf);

import { DeleteBookshelf } from "../controllers/User/Bookshelf/DeleteBookshelfController.js";
UserRouter.post("/deletebookshelf", route.use(cookieParser()), DeleteBookshelf);

import { BookshelfCheck } from "../controllers/User/Bookshelf/BookshelfCheckController.js";
UserRouter.post("/bookshelfcheck", route.use(cookieParser()), BookshelfCheck);

import { BookshelfList } from "../controllers/User/Bookshelf/BookshelfListController.js";
UserRouter.post("/bookshelflist", route.use(cookieParser()), BookshelfList);

import { ProfileChange } from "../controllers/User/Profile/ProfileChangeController.js";
UserRouter.post("/profileChange", route.use(cookieParser()), ProfileChange);

import { CountBookshelfInfo } from "../controllers/User/Bookshelf/CountBookshelfInfoController.js";
UserRouter.post(
  "/countBookshelfInfo",
  route.use(cookieParser()),
  CountBookshelfInfo
);

export default UserRouter;
