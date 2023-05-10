import mongoose from "mongoose";
import createConnection from "../connection.js";

/**
 * @name 이름
 * @birth 생년월일
 * @sex 성별
 * @phone 핸드폰번호
 * @email 이메일주소
 * @usertype 사용자타입(사용자,관리자)
 * @signuptype 가입타입(카카오,구글,네이버,애플 등)
 */
const ProfileSchema = mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    birth: { type: String, trim: true, required: true },
    sex: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, unique: true, required: true },
    email: { type: String, trim: true, unique: true },
    usertype: { type: Number, trim: true, default: 0, required: true },
    signuptype: { type: String, lowercase: true, trim: true, required: true },
  },
  { timestamps: true }
);

export default createConnection("member").model("profile", ProfileSchema);
