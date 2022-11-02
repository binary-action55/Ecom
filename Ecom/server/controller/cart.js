const e = require('express');
const path = require('path');
const rootDirectory = require('../utils/rootDirectory');
const Cart = require(path.join(rootDirectory,'model','cart'));
const Product = require(path.join(rootDirectory,'model','product'));
const Sequelize = require('sequelize');

module.exports.addToCart = async (req,res,next) => {
    try{
        if(req.body.id == null)
            throw new Error('id is undefined or null');
        if(req.body.quantity == null)
            throw new Error('quantity is undefined or null');
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:err});
    }
    try{
        const cartItem = await Cart.findByPk(req.body.id);
        const product = await Product.findByPk(req.body.id);
        if(cartItem===null){
            await Cart.create({
                id:product.id,
                quantity: 1,
                subTotal: +product.price,
            });
            res.status(201).json({success:true,messsage:"item added"});
        }
        else{
            const updatedQuantity = cartItem.quantity+(+req.body.quantity);
            const updatedTotal = cartItem.subTotal+(+req.body.quantity*(product.price));
            await Cart.update({
                quantity: updatedQuantity,
                subTotal: updatedTotal,
            },{
                where:{
                    id : cartItem.id,
                }
            });
            res.status(201).json({success:true,messsage:"item added"});
        }
    }
    catch(err){
       console.log(err);
       res.status(500).json({messsage:err}); 
    }
}

module.exports.getCartItems = async (req,res,next) =>{
    try{
        const cartItems = await Cart.findAll();
        if(cartItems.length===0)
        {
            res.status(200).json({cartItemList:[],cartTotal:0});
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
            res.status(200).json({cartItemList:cartItemList,cartTotal});
        }
    }
    catch(err){
        console.log(err);
        res.json(500).json({message:err});
    }
}


