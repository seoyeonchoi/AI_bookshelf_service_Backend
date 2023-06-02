import mongoose from "mongoose";
// import createConnection from "../../connection.js";

const AuthenticationSchema = mongoose.Schema(
  {
    user_id: { type: mongoose.SchemaTypes.ObjectId, trim: true, unique: true },
    birth: { type: String, trim: true, required: true },
    sex: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

// export default createConnection("user").model(
//   "authentication",
//   AuthenticationSchema
// );
export default mongoose.model("authentication", AuthenticationSchema);
