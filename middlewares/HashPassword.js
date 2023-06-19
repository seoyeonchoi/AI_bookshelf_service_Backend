import express from "express";
import crypto from "crypto";
import User from "../models/user.js";
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
      ? await User.findOne({
          email: req.body.email,
        })
          .then(async (data) => {
            req.body.user_id = data?._id;
            return await Password.findOne({ user_id: data?._id });
          })
          .then((data) => data?.salt)
      : await createSalt(); //회원가입

  // console.log(salt);

  if (salt) {
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
  } else {
    // console.log(e);
    return res.status(500).json({
      success: false,
      info: {
        message: "not found account",
      },
    });
  }
});

export default router;
