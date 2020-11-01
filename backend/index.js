const express = require("express");
const mongoose = require("./config/db");
const config = require("./config/config");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = config.appPort;
const user = require("./routes/user");
const auth = require("./routes/auth");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/auth", auth);
app.use("/user", user);

app.listen(port, () => {
  console.log(`Start server at http://localhost:${port}`);
});
