import dotenv from "dotenv"; // .env file
dotenv.config();

export default {
  default: "member",
  auth: "mongodb://localhost:27017/auth",
  member: "mongodb://localhost:27017/member",
  user: "mongodb://localhost:27017/user",
};
