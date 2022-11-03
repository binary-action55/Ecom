const path = require('path');
const rootDirectory = require('../utils/rootDirectory');
const sequelize = require(path.join(rootDirectory,'utils','database'));
const Sequelize = require('sequelize');

module.exports = sequelize.define('orderItem',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
    },
    quantity:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
});
