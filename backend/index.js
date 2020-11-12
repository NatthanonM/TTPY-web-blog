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
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });
const { authMiddleware } = require("./utils/authUtil");

app.use(frameguard({ action: "SAMEORIGIN" }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/auth", auth);
app.use("/user", csrfProtection, authMiddleware, user);
app.use("/post", csrfProtection, authMiddleware, post);
app.use("/comment", csrfProtection, authMiddleware, comment);
app.use("/user", csrfProtection, authMiddleware, user);

app.listen(port, () => {
  console.log(`Start server at http://localhost:${port}`);
});
