const express = require("express");
const _ = require("lodash");
const User = require("../../models/user");
const router = express.Router();

router.post("/users/login", (req, res) => {
  const body = _.pick(req.body, ["id", "password"]);
  User.findByCredentials(body.id, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.header("x-auth", token).send({ id: body.id, role: user.role });
      });
    })
    .catch(err => {
      res.status(400).send(err);
    });
}); //POST login users '/users/login'

module.exports = router;
