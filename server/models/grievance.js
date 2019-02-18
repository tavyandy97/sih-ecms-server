const Sequelize = require('sequelize');

const {sequelize} = require('../db/connect');
const Grievance = sequelize.define('grievance', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});

module.exports = {
  Grievance
};
