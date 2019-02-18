const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

require('dotenv').config();

var app = express();
const port = process.env.PORT;
app.use(bodyParser.json());



app.listen( port , () => {
  console.log(`Started listening to port : ${port}...`);
})

