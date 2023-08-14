const express = require('express');
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const db = require('./models');
const deliveryRouter = require('./routes/deliveries');
const fs = require('fs');

const path = require('path');

const app = express();
const port = 3002;
// cache 테스트
// cache 테스트
// cache 테스트
// cache 테스트
const morgan = require('morgan');
// 로그 파일 스트림 생성
const accessLogStream = fs.createWriteStream(path.join('/var/log/app/access.log'), { flags: 'a' });

// 사용자 정의 토큰 생성
morgan.token('client-ip', function(req, res) {
  return req.header('x-forwarded-for') || req.connection.remoteAddress;
});

// morgan을 사용하여 액세스 로그 설정 (새로운 client-ip 토큰 포함)
app.use(morgan(':client-ip - :remote-user :method :url HTTP/:http-version :status :res[content-length] \
:response-time ms ":referrer" ":user-agent"', { stream: accessLogStream }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use("/deliveries", deliveryRouter);
app.set('view engine', 'ejs');  

app.get("/", (req, res) => {
  res.redirect("http://www.devops.com");
});

app.listen(port, () => {
  console.log(`Product service app listening on port ${port}`);
});

