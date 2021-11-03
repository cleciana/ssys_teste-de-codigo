const moment = require('moment');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static getEmployeeAge(birth_date) {
      try {
        const today = new Date();
        const age = today.getFullYear() - birth_date.getFullYear();
        const month = today.getMonth() - birth_date.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birth_date.getDate())) {
          age--;
        }
        return age;

      } catch (error) {
        return `${error.message}`;
      }
    }
    
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