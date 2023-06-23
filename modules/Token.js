// import db from "../models";
import dotenv from "dotenv"; // .env file
import jwt from "jsonwebtoken";
dotenv.config();

const JWT_SEC = process.env.JWT_SECRET;
// console.log("JWT_SEC", JWT_SEC);

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

export const AccessToken = (data) => {
  // console.log(JWT_SEC);
  return jwt.sign(
    {
      data: data,
    },
    JWT_SEC,
    {
      expiresIn: "200000ms", //20분
      issuer: "server",
    }
  );
};

export const RefreshToken = (data) => {
  // const secretKey = String(createSecret());
  return jwt.sign(
    {
      data: data,
    },
    JWT_SEC,
    {
      expiresIn: "24h", //24시간
      issuer: "server",
    }
  );
};
