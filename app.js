require("dotenv").config(); //.env 호출

const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000; // 포트번호

app.get("/", (req, res) => {
  res.send(`Okay let's go`);
});

app.listen(PORT, () => {
  console.log(`Server on : http://localhost:${PORT}/`);
});
