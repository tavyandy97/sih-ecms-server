const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const routes = require("./controllers");

var app = express();
const port = process.env.PORT;
app.use(
  cors({
    exposedHeaders: ["X-Auth", "Ocp-Apim-Subscription-Key"]
  })
);
app.use(bodyParser.json());

app.use(routes);

app.listen(port, () => {
  console.log(`Started listening to port : ${port}...`);
});
