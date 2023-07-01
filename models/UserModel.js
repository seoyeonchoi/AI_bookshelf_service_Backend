import mongoose from "mongoose";
// import createConnection from "../../connection.js";

const userSchema = mongoose.Schema(
  {
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
        title: { type: String },
        link: { type: String },
        image: { type: String },
        author: { type: String },
        discount: { type: String },
        publisher: { type: String },
        pubdate: { type: String },
        isbn: { type: String, required: true, unique: true },
        description: { type: String },
        category: { type: String },
        page: { type: Number },
        weight: { type: Number },
      },
    ],
    user_like_book: [
      {
        title: { type: String },
        link: { type: String },
        image: { type: String },
        author: { type: String },
        discount: { type: String },
        publisher: { type: String },
        pubdate: { type: String },
        isbn: { type: String, required: true, unique: true },
        description: { type: String },
        category: { type: String },
        page: { type: Number },
        weight: { type: Number },
      },
    ],
    user_cart: [
      {
        title: { type: String },
        link: { type: String },
        image: { type: String },
        author: { type: String },
        discount: { type: String },
        publisher: { type: String },
        pubdate: { type: String },
        isbn: { type: String, required: true, unique: true },
        description: { type: String },
        category: { type: String },
        page: { type: Number },
        weight: { type: Number },
      },
    ],
    user_interest: [
      {
        title: { type: String },
        link: { type: String },
        image: { type: String },
        author: { type: String },
        discount: { type: String },
        publisher: { type: String },
        pubdate: { type: String },
        isbn: { type: String, required: true, unique: true },
        description: { type: String },
        category: { type: String },
        page: { type: Number },
        weight: { type: Number },
      },
    ],
    access_token: { type: String, trim: true, unique: false, default: null },
    refresh_token: { type: String, trim: true, unique: false, default: null },
  },
  { timestamps: true }
);
// export default createConnection("user").model("user", userSchema);
export default mongoose.model("user", userSchema);
