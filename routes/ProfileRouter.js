import express from "express";
import RemoveDash from "../middlewares/PhoneRemoveDash.js";
import { SignUp } from "../controllers/ProfileController.js";

const ProfileRouter = express.Router();

ProfileRouter.post("/signup", RemoveDash, SignUp);

export default ProfileRouter;
