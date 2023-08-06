const express = require('express');
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const db = require('./models');
const deliveryRouter = require('./routes/deliveries');

const app = express();
const port = 3002;

// 로그 파일 스트림 생성
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// morgan을 사용하여 액세스 로그 설정
app.use(morgan('combined', { stream: accessLogStream }));

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

