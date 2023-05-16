// import db from "../models";
import dotenv from "dotenv"; // .env file
import jwt from "jsonwebtoken";
dotenv.config();

const JWT_SEC = process.env.JWT_SECRET;
// console.log("JWT_SEC", JWT_SEC);

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
      // console.log("토큰이 만료되었습니다.");
      return null;
    } else if (error.name === "JsonWebTokenError") {
      // console.log("토큰이 없습니다.");
      return null;
    }
    // console.log("VerifyToken", error);
    return null;
  }
};

export const AccessToken = (email) => {
  // const secretKey = String(createSecret());
  // console.log(JWT_SEC);
  return jwt.sign(
    {
      email: email,
    },
    JWT_SEC,
    {
      expiresIn: "200000ms", //20분
      issuer: "server",
    }
  );
};

export const RefreshToken = (email) => {
  // const secretKey = String(createSecret());
  return jwt.sign(
    {
      email: email,
    },
    JWT_SEC,
    {
      expiresIn: "24h", //24시간
      issuer: "server",
    }
  );
};
