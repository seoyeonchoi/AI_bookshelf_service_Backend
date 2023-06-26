import dotenv from "dotenv"; // .env file
import UserRouter from "./routes/UserRouter.js";
import AuthRouter from "./routes/AuthRouter.js";
import mongoose from "mongoose";
import Express from "express";
import cors from "cors";

dotenv.config();
const app = Express();
const localhost = "localhost";
const PORT = process.env.PORT || 5000; // 포트번호

app.use(cors());
// json 파싱은 기본 100kb까지만 가능하다 limit는 이를 50MB까지 하기 위한 옵션이다
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

app.get("/", (req, res) => {
  res.send(`Okay let's go`);
});

//route
app.use("/auth", AuthRouter);
app.use("/user", UserRouter);

app.listen(PORT, () => {
  console.log(
    `Server on : http://${process.env.REMOTE_IP || localhost}:${PORT}/`
  );
});

//mongodb
mongoose.connect(process.env.CONNECTION_URL);

export default app;
