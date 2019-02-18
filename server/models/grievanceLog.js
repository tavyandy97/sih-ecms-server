const Sequelize = require('sequelize');

const {sequelize} = require('../db/connect');
const GrievanceLog = sequelize.define('grievancelog', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  log: {
    type: Sequelize.STRING(2000),
    allowNull:false
  },
  grievanceid: {
    type: Sequelize.BIGINT,
    references: {
      model: Grievance,
      key: 'id',
    }
  },
  userid: {
    type: Sequelize.BIGINT,
    references: {
      model: User,
      key: 'id',
    }
  }
});



module.exports = {
  GrievanceLog
};
