/**몽고디비 컬렉션을 sql의 데이터베이스처럼 쓰는 모듈 */
import mongoose from "mongoose";
import config from "./config.js";

mongoose.Promise = global.Promise;

export default (name = config.default) => {
  return mongoose.createConnection(config[name]);
};
