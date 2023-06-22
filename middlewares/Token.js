import express from "express";
import User from "../models/UserModel.js";
import Auth from "../models/AuthModel.js";

const router = express.Router();

export default router.use("/", async (req, res, next) => {
  const { user_id, password } = req.body;

  console.log(req.body);
  // console.log(password);
  await Auth.findOne({ user_id: user_id, password: password }).then(
    async (data) => {
      // console.log(222, data);
      if (data === null) {
        return res.status(400).json({
          success: false,
          error: {
            message: "not found account",
          },
        });
      } else {
        await User.findOne({ _id: user_id }).then((data) => {
          // console.log(333, data);
          // req.body = data;
          req.body.access_token = data?.access_token;
          req.body.refresh_token = data?.refresh_token;
        });
        next();
      }
    }
  );
});
