import mongoose from "mongoose";
import createConnection from "../../connection.js";

/**
 * @name 이름
 * @birth 생년월일
 * @sex 성별
 * @phone 핸드폰번호
 * @email 이메일주소
 * @usertype 사용자타입(사용자,관리자)
 * @signuptype 가입타입(카카오,구글,네이버,애플 등)
 */
const PasswordSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      trim: true,
      unique: true,
      required: true,
    },
    salt: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

export default createConnection("auth").model("password", PasswordSchema);
