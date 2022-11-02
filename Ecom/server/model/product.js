const path = require('path');
const rootDirectory = require('../utils/rootDirectory');
const sequelize = require(path.join(rootDirectory,'utils','database'));
const Sequelize = require('sequelize');

module.exports = sequelize.define('products',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement:true,
    },
    name:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    price:{
        type: Sequelize.DOUBLE,
        allowNull:false,
    },
    imageURL:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    category:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    description:{
        type: Sequelize.STRING,
        allowNull:false,
    }

});
