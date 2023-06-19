import express from "express";
import Authentication from "../models/auth.js";
import Password from "../models/Auth/PasswordModel.js";

const router = express.Router();

export default router.use("/", async (req, res, next) => {
  const { user_id, password } = req.body;

  // console.log(req.body);
  // console.log(password);
  await Password.findOne({ user_id: user_id, password: password }).then(
    async (data) => {
      // console.log(data);
      if (data === null) {
        return res.status(400).json({
          success: false,
          error: {
            message: "not found account",
          },
        });
      } else {
        await Authentication.findOne({ user_id: user_id }).then((data) => {
          req.body.access_token = data?.access_token;
          req.body.refresh_token = data?.refresh_token;
        });
        next();
      }
    }
  );
});
