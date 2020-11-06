const express = require("express");
const mongoose = require("./config/db");
const config = require("./config/config");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = config.appPort;
const user = require("./routes/user");
const auth = require("./routes/auth");
const post = require("./routes/post");
const comment = require("./routes/comment");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const { authMiddleware } = require("./utils/authUtil");

app.use("/auth", auth);
app.use("/user", user);
app.use("/post", post);
app.use("/comment", comment);

app.listen(port, () => {
  console.log(`Start server at http://localhost:${port}`);
});
