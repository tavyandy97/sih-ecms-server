const Sequelize = require('sequelize');

const {sequelize} = require('../db/connect');
const ClosureRequest = sequelize.define('closurerequest', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  status: {
    type: Sequelize.INTEGER,
    validate: { min: -1 , max: 1},
    defaultValue: 0
  },
  userid: {
    type: Sequelize.BIGINT,
    references: {
      model: User,
      key: 'id',
    }
  },
  grievanceid: {
    type: Sequelize.BIGINT,
    references: {
      model: Grievance,
      key: 'id',
    }
  }
});



module.exports = {
  ClosureRequest
};
