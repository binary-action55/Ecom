const express = require('express');
const path = require('path');
const rootDirectory = require('./utils/rootDirectory');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const sequelize = require('./utils/database');

const errorRoutes = require(path.join(rootDirectory,'routes','error'));
const productRoutes = require(path.join(rootDirectory,'routes','product'));

const app = express();

app.use(cors());
app.use(bodyParser.json({extension:false}));
app.use(bodyParser.urlencoded({extended:false}));

app.use('/product',productRoutes);
app.use('/',errorRoutes);

sequelize
.sync()
.then(()=>app.listen(3000));