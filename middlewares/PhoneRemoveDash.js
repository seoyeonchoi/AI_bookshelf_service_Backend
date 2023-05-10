import express from "express";

const router = express.Router();

export default router.use("/", (req, res, next) => {
  const { phone } = req.body;

  try {
    phone.toString().replace("-", "");
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      error: {
        message: err.message,
        message_1: "phone is null",
      },
    });
  }
  req.body.phone = phone;
  next();
});
