const Sequelize = require('sequelize');

const {sequelize} = require('../db/connect');
const Grievance = sequelize.define('grievance', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  subject: {
    type: Sequelize.STRING(2000),
    validate: {
      notNull: true
    }
  },
  descriiption: {
    type: Sequelize.STRING(2000),
    validate: {
      notNull: true
    }
  },
  isOpen: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  time1: {
    type: Sequelize.STRING(10),
    validate: {
      notNull: true
    }
  },
  time2: {
    type: Sequelize.STRING(10),
    validate: {
      notNull: true
    }
  },
  time3: {
    type: Sequelize.STRING(10),
    validate: {
      notNull: true
    }
  },
  timeOF: {
    type: Sequelize.STRING(10),
    validate: {
      notNull: true
    }
  },
  subcategoryid: {
    type: Sequelize.BIGINT,
    references: {
      model: SubCategory,
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
  Grievance
};
