import dotenv from "dotenv"; // .env file
// import UserRouter from "./routes/UserRouter.js";
import AuthRouter from "./routes/AuthRouter.js";
import mongoose from "mongoose";
import Express from "express";
// import bodyParser from "body-parser";

dotenv.config();
const app = Express();
const localhost = 'localhost'
const PORT = process.env.PORT || 5000; // 포트번호

// json 파싱은 기본 100kb까지만 가능하다 limit는 이를 50MB까지 하기 위한 옵션이다
app.use(Express.urlencoded({ limit: "50mb", extended: true }));
app.use(Express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send(`Okay let's go`);
});

//route
app.use("/auth", AuthRouter);
// app.use("/user", UserRouter);

app.listen(PORT, () => {
  console.log(`Server on : http://${process.env.REMOTE_IP || localhost}:${PORT}/`);
});

//mongodb
mongoose.connect(process.env.CONNECTION_URL);


import User from "./models/user.js"; // 작성한 스키마가 있는 파일의 경로와 파일명으로 수정

// 사용자 생성
const newUser = new User({
  user_name: 'john_doe',
  
  
});

newUser.save()
  .then(savedUser => {
    console.log('새로운 사용자가 저장되었습니다:', savedUser);
  })
  .catch(error => {
    console.error('사용자 저장 중 오류가 발생했습니다:', error);
  });

// 사용자 조회
User.findOne({ username: 'john_doe' })
  .then(foundUser => {
    console.log('조회된 사용자:', foundUser);
  })
  .catch(error => {
    console.error('사용자 조회 중 오류가 발생했습니다:', error);
  });


export default app;
