import dotenv from "dotenv"; // .env file
dotenv.config();

export default {
  default: "member",
  auth: process.env.CONNECTION_URL_AUTH,
  member: process.env.CONNECTION_URL_MEMBER,
};
