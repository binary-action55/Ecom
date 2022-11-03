const express = require('express');
const path = require('path');
const rootDirectory = require('./utils/rootDirectory');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const sequelize = require('./utils/database');


//models
const Cart = require(path.join(rootDirectory,'model','cart'));
const Product = require(path.join(rootDirectory,'model','product'));
const User = require(path.join(rootDirectory,'model','user'));
const CartItem = require(path.join(rootDirectory,'model','cartItem'));
const Order = require(path.join(rootDirectory,'model','order'));
const OrderItem = require(path.join(rootDirectory,'model','orderItem'));

//routes
const errorRoutes = require(path.join(rootDirectory,'routes','error'));
const productRoutes = require(path.join(rootDirectory,'routes','product'));

const app = express();

app.use(cors());
app.use(bodyParser.json({extended:false}));
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',(req,res,next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user = user;
        next();
    })
    .catch(err=>console.log(err));
})


app.use('/product',productRoutes);
app.use('/',errorRoutes);

Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});

User.hasMany(Order);
Order.belongsTo(User,{constraints:true,onDelete:'CASCADE'});

Product.belongsToMany(Order,{through:OrderItem});
Order.belongsToMany(Product,{through:OrderItem});

sequelize
.sync()
.then(()=>{
    return User.findByPk(1);
})
.then((user)=>{
    if(!user)
    {
        return User.create({name:'John',email:'asd@fake.co',phone:'9888989876'});
    }
    return user;
})
.then(user=>{
    const cart = user.getCart();
    if(!cart)
        return user.createCart();
    return cart;
})
.then((cart)=>app.listen(3000))
.catch(err=>console.log(err));