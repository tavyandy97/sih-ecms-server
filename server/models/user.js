const Sequelize = require('sequelize');

const {sequelize} = require('../db/connect');
const User = sequelize.define('user', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(30),
    validate: {
      notNull: true
    }
  },
  dob: {
    type: Sequelize.DATEONLY,
    validate: {
      notNull: true,
      isDate: true
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      notNull: true,
      isEmail: true
    }
  },
  isStudent: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  phone: {
    type: Sequelize.BIGINT(10),
    validate: {
      notNull: true
    }
  },
  sex: {
    type: Sequelize.STRING(1),
    validate: {
      isSex(value){
        newVal = value.toUpperCase();
        if( !(newVal === 'M' || newVal === 'O' || newVal === 'F'))
          throw new Error(`Only \'M\', \'F\', \'O\' values are allowed!`)
      }
    },
    set(val) {
      this.setDataValue('sex', val.toUpperCase());
    }
  },
  role: {
    type: Sequelize.STRING(1),
    validate: {
      isRole(value){
        newVal = value.toUpperCase();
        if( !(newVal == 'S' || newVal === 'F' || newVal === 'C' || newVal === 'P' || newVal === 'O' || newVal === 'A'))
          throw new Error(`Only \'S\', \'F\', \'C\', \'P\', \'O\', \'A\' values are allowed!`)
      }
    },
    set(val) {
      this.setDataValue('role', val.toUpperCase());
    }
  }
}, {
  validate: {
    isStudentOnly(){
      if(this.isStudent && this.role !== 'S'){
        throw new Error('The user is not an end user, hence cannot have status of student!');
      }
    }
  }
});

module.exports = {
  User
};
