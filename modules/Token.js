import db from "../models";
import dotenv from "dotenv"; // .env file
import jwt from "jsonwebtoken";
dotenv.config();

const JWT_SEC = process.env.JWT_SECRET;

// const createSecret = () =>
//   //JWT_SECRET 값 생성
//   new Promise((resolve, reject) => {
//     crypto_.randomBytes(64, (err: any, buf: any) => {
//       if (err) reject(err);
//       resolve(buf.toString("base64"));
//     });
//   });

export const VerifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SEC);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log("토큰이 만료되었습니다.");
      return null;
    }
    console.log(error);
    return null;
  }
};

export const AccessToken = (email, name) => {
  // const secretKey = String(createSecret());
  // console.log(JWT_SEC);
  return jwt.sign(
    {
      email: email,
      name: name,
    },
    JWT_SEC,
    {
      expiresIn: "20000ms", //20분
      issuer: "pullim",
    }
  );
};

export const RefreshToken = (email, name) => {
  // const secretKey = String(createSecret());
  return jwt.sign(
    {
      email: email,
      name: name,
    },
    JWT_SEC,
    {
      expiresIn: "24h", //24시간
      issuer: "pullim",
    }
  );
};

export const FindUser = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const user = await db.User_token.findOne({
      include: [
        {
          model: db.User,
          as: "UserToken",
        },
      ],
      where: {
        refresh_token: refreshToken,
      },
    });
    console.log("============= findUser: start  =============");
    req.body.userData = user.dataValues.UserToken.dataValues;
    req.body.userToken = user.dataValues;
    console.log("============= findUser: end  =============");
    next();
  } catch (error) {
    next(error);
  }
};
