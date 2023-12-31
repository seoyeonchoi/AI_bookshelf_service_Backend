import express from "express";
import crypto from "crypto";
import User from "../models/UserModel.js";
import Auth from "../models/AuthModel.js";

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
  // console.log(req.body?.email);
  const salt =
    req.body.name === undefined
      ? await User.findOne({
          user_email: req.body.email,
        })
          .then(async (data) => {
            // console.log(data);
            req.body.user_id = data?._id;
            return await Auth.findOne({ user_id: data?._id });
          })
          .then((data) => data?.salt)
      : await createSalt(); //회원가입

  // console.log(salt);

  if (salt) {
    crypto.pbkdf2(req.body.password, salt, 9999, 64, "sha512", (e, key) => {
      if (e) {
        console.log(333, e);
        return res.status(500).json({
          success: false,
          info: {
            message: e,
          },
        });
      }
      req.body.password = key.toString("base64");
      req.body.salt = salt;
      next();
    });
  } else {
    return res.status(500).json({
      success: false,
      info: {
        message: "not found account",
      },
    });
  }
});

export default router;
