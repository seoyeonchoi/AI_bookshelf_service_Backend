import mongoose from "mongoose";
// import createConnection from "../../connection.js";

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

// export default createConnection("auth").model("password", PasswordSchema);
export default mongoose.model("password", PasswordSchema);
