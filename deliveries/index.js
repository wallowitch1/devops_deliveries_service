const express = require('express');
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const db = require('./models');
const deliveryRouter = require('./routes/deliveries');

const app = express();
const port = 3002;
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

