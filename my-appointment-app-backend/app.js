const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");
const userRouter = require("./routes/user");
const serviceRouter = require("./routes/service");

const User = require("./models/user");

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(serviceRouter);
// testing
// const corsOptions = {
//   credentials: true,
//   origin: ["http://localhost:3000", "http://localhost:8081"], // Whitelist the domains you want to allow
// };

// app.use(cors(corsOptions)); 

app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to backend zone!" });
});

app.listen(8000, () => {
    console.log('port is listening');
  });
