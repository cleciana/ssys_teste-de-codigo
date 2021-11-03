const moment = require('moment');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Employee.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    department: DataTypes.STRING,
    salary: DataTypes.FLOAT,
    birth_date: {
      type: DataTypes.DATEONLY,
      get: function() {
        return moment(this.getDataValue('birth_date')).format('DD-MM-YYYY');
     }
    }
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};