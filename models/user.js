import mongoose from "mongoose";
// import createConnection from "../../connection.js";


const bookshelfSchema = mongoose.Schema({
    bookshelf_image: { type: String, trim: true },
    book_id: [{ type: String, trim: true }],
  });
  
  const profileSchema = new mongoose.Schema({
    user_nickname: { type: String, trim: true, required: true },
    image: { type: String, trim: true },
  });
  
  


  const userSchema = mongoose.Schema({
    user_name: { type: String, trim: true, required: true },
    user_birth: { type: Date, trim: true },
    user_sex: { type: String, trim: true },
    user_phone: { type: String, trim: true },
    profile: { type: profileSchema},
    user_bookshelf: { type: bookshelfSchema },
    user_like_book: [{ type: String }],
    user_cart: [{ type: String }],
    user_interest: [{ type: String }],
  });
  // export default createConnection("user").model("user", userSchema);
  export default mongoose.model("user", userSchema);

  