const e = require('express');
const path = require('path');
const rootDirectory = require('../utils/rootDirectory');
const Cart = require(path.join(rootDirectory,'model','cart'));
const Product = require(path.join(rootDirectory,'model','product'));
const Sequelize = require('sequelize');

module.exports.addToCart = async (req,res,next) => {
    try{
        const cartItem = await Cart.findByPk(req.body.id);
        const product = await Product.findByPk(req.body.id);
        if(cartItem===null){
            await Cart.create({
                id:product.id,
                quantity: 1,
                subTotal: +product.price,
            });
            res.json({messsage:"item added"});
        }
        else{
            const updatedQuantity = cartItem.quantity+(+req.body.quantity);
            const updatedTotal = cartItem.subTotal+(+req.body.quantity*(product.price));
            console.log(updatedQuantity,updatedTotal);
            await Cart.update({
                quantity: updatedQuantity,
                subTotal: updatedTotal,
            },{
                where:{
                    id : cartItem.id,
                }
            });
            res.json({messsage:"item added"});
        }
    }
    catch(err){
       console.log("err",err);
       res.status(500).json({messsage:"error"}); 
    }
}

module.exports.getCartItems = async (req,res,next) =>{
    try{
        const cartItems = await Cart.findAll();
        if(cartItems.length===0)
        {
            res.json({cartItemList:[],cartTotal:0});
        }
        else{
            const cartItemList = [];
            for(let item of cartItems)
            {
                const productItem = await Product.findByPk(item.id);
                const cartListItem = {
                    ...productItem.dataValues,
                    quantity: item.quantity,
                    subTotal: item.subTotal,
                };
                cartItemList.push(cartListItem);
            }
            const total = await Cart.findAll({
                attributes:[
                        [Sequelize.fn('SUM',Sequelize.col('subTotal')),'cartTotal']
                ]
            })
            cartTotal = (Math.round(total[0].dataValues.cartTotal*100))/100;
            res.json({cartItemList:cartItemList,cartTotal});
        }
    }
    catch(err){
        console.log("err",err);
    }
}


