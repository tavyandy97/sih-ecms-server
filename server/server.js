const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

require("dotenv").config();

const { User } = require("./models/user");

var app = express();
const port = process.env.PORT;
app.use(bodyParser.json());

app.post("/users/login", (req, res) => {
  var body = _.pick(req.body, ["id", "password"]);
  User.findByCredentials(body.id, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.header("x-auth", token).send({ id: body.id });
      });
    })
    .catch(err => {
      res.status(400).send();
    });
}); //POST login users '/users/login'

app.listen(port, () => {
  console.log(`Started listening to port : ${port}...`);
});
