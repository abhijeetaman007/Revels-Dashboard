const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(".env") });
const Razorpay = require("razorpay");
const router = require("./routes/index");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use((req, res, next) => {
  const allowedOrigins = ["https://revelsmit.in", "http://localhost:3000"];
  const origin = req.headers.origin;
  console.log(origin);
  if (allowedOrigins.indexOf(origin) > -1)
    res.setHeader("Access-Control-Allow-Origin", origin);
  else if (process.env.NODE_ENV !== "production")
    res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,PUT,POST,DELETE, PATCH"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// const razorpay = new Razorpay({
//     key_id: 'rzp_test_YwEGRlKoqLToxD',
//     key_secret: 'HyE84sPchHUZ2mqDOyC5j97l',
// });

app.get("/api", (req, res) => {
  res.json({
    msg: "Welcome to Revels22 Dashboard API",
    success: true,
  });
});

app.use("/api", router);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
// module.exports = { razorpay };
