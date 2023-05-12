import express from "express";
import crypto from "crypto";
import User from "../models/User/UserModel.js";
import Password from "../models/Auth/PasswordModel.js";

const router = express.Router();

const createSalt = () =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(64, (e, buf) => {
      // console.log(111, typeof e);
      // console.log(222, typeof buf);
      // console.log(333, buf);
      if (e) reject(e);
      resolve(buf.toString("base64"));
    });
  });

router.use("/", async (req, res, next) => {
  const salt =
    req.body.name === undefined
      ? await Password.findOne({
          user_id: await User.findOne({ email: req.body.email }).then(
            (data) => data._id
          ),
        }).then((data) => data.salt)
      : // data ? data.dataValues.salt : ""

        await createSalt(); //회원가입
  // console.log(111, salt);
  try {
    crypto.pbkdf2(req.body.password, salt, 9999, 64, "sha512", (e, key) => {
      if (e)
        return res.status(500).json({
          success: false,
          info: {
            message: e,
          },
        });
      req.body.password = key.toString("base64");
      req.body.salt = salt;
      next();
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      info: {
        message: e.code,
      },
    });
  }
});

export default router;
