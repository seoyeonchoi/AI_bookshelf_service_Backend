import mongoose from "mongoose";
// import createConnection from "../../connection.js";

const AuthenticationSchema = mongoose.Schema({
  user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      trim: true,
      unique: true,
    },
  user_email: { type: String, required: true, unique: true },
  user_name: { type: String, required: true },
  user_password: { type: String, trim: true, required: true },
  user_salt: { type: String, trim: true, required: true },
  withdrawal: { type: Boolean, default: false },
  access_token: { type: String, trim: true, unique: false, required: true },
  refresh_token: { type: String, trim: true, unique: false, required: true },
  
});

// export default createConnection("auth").model("auth", AuthSchema);
export default mongoose.model("authentication", AuthenticationSchema);