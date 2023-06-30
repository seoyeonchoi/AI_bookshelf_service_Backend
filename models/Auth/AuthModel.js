// import mongoose from "mongoose";
// // import createConnection from "../../connection.js";

// const AuthSchema = mongoose.Schema(
//   {
//     user_id: {
//       type: mongoose.SchemaTypes.ObjectId,
//       trim: true,
//       unique: true,
//     },
//     access_token: { type: String, trim: true, unique: false, required: true },
//     refresh_token: { type: String, trim: true, unique: false, required: true },
//   },
//   { timestamps: true }
// );

// // export default createConnection("auth").model("auth", AuthSchema);
// export default mongoose.model("auth", AuthSchema);
