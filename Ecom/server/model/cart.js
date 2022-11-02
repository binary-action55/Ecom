const path = require('path');
const rootDirectory = require('../utils/rootDirectory');
const sequelize = require(path.join(rootDirectory,'utils','database'));
const Sequelize = require('sequelize');

module.exports = sequelize.define('cart',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    quantity:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    subTotal:{
        type:Sequelize.DOUBLE,
        allowNull:false,
    },
});
