import mongoose from "mongoose";
// import createConnection from "../../connection.js";

const bookshelfSchema = mongoose.Schema({
  bookshelf_image: { type: String, trim: true },
  book_id: [{ type: String, trim: true }],
});

const userSchema = mongoose.Schema({
  user_email: { type: String, trim: true, required: true },
  user_name: { type: String, trim: true, required: true },
  user_birth: { type: Date, trim: true, required: true },
  user_sex: { type: String, trim: true, required: true },
  user_phone: { type: String, trim: true, required: true },
  user_work: { type: String, trim: true, require: true },
  signuppath: { type: String, trim: true },
  useCheck: { type: Boolean, require: true },
  infoCheck: { type: Boolean, require: true },
  marketingCheck: { type: Boolean, require: true },
  user_type: { type: Number, default: 1 },
  signuptype: { type: String, default: "local" },
  profile: {
    user_nickname: { type: String, trim: true, required: true },
    image: { type: String, trim: true },
  },
  user_bookshelf: [
    {
      d_isbn: { type: Number, trim: true },
    },
  ],
  user_like_book: [
    {
      d_isbn: { type: Number, trim: true },
    },
  ],
  user_cart: [
    {
      d_isbn: { type: Number, trim: true },
    },
  ],
  user_interest: [
    {
      d_isbn: { type: Number, trim: true },
    },
  ],
  access_token: { type: String, trim: true, unique: false, default: null },
  refresh_token: { type: String, trim: true, unique: false, default: null },
});
// export default createConnection("user").model("user", userSchema);
export default mongoose.model("user", userSchema);
