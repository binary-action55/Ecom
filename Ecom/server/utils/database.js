const Sequelize = require('sequelize');

const sequelize = new Sequelize('ecom','root','Noderoot123',{
    dialect:'mysql',
    host:'localhost',
});

module.exports = sequelize;