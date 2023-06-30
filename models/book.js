import mongoose from "mongoose";
// import createConnection from "../../connection.js";


const mongoose = require('mongoose');

const bookImageSchema = mongoose.Schema({
  title_image: { type: String },
  image: { type: String },
});

const bookSaleUrlSchema = mongoose.Schema({
  gyobo: { type: String },
  youngpoong: { type: String },
  aladin: { type: String },
  yes24: { type: String },
});

const bookinfoSchema = mongoose.Schema({
  ISBN: { type: Number, trim: true, unique: true },
  book_title: { type: String, required: true },
  book_subtitle: { type: String },
  book_createAt: { type: Date },
  book_publisher: { type: String },
  book_author: { type: String },
  book_price: { type: Number },
  book_summary: { type: String },
  book_image: { type: bookImageSchema },
  book_sale_url: { type: bookSaleUrlSchema },
  genre: [{ type: String }],
  liked_user:[{ type: String }],
});

export default mongoose.model("bookinfo", bookinfoSchema);
