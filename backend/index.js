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
const cookieParser = require("cookie-parser");
const frameguard = require("frameguard");
var csurf = require("csurf");

app.use(frameguard({ action: "SAMEORIGIN" }));
var csrfProtection = csurf({ cookie: true });
app.use(cookieParser());

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const { authMiddleware } = require("./utils/authUtil");

app.use("/auth", auth);
app.use("/user", csrfProtection, authMiddleware, user);
app.use("/post", csrfProtection, authMiddleware, post);
app.use("/comment", csrfProtection, authMiddleware, comment);
app.use("/user", csrfProtection, authMiddleware, user);

app.listen(port, () => {
  console.log(`Start server at http://localhost:${port}`);
});
