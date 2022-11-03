const e = require('express');
const path = require('path');
const rootDirectory = require('../utils/rootDirectory');
const Cart = require(path.join(rootDirectory,'model','cart'));
const Product = require(path.join(rootDirectory,'model','product'));
const Sequelize = require('sequelize');
const cart = require('../model/cart');


const PRODUCTS_PER_PAGE = 2;

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
        const Cart = await req.user.getCart();
        const products = await Cart.getProducts({where:{id:+req.body.id}});
        const [product,...meta] = await req.user.getProducts({where:{id:+req.body.id}});
        if(products.length===0){
            await Cart.addProduct(product,{
                through:{
                    quantity: 1,
                    subTotal: +product.price,
                }
            });
            res.status(201).json({success:true,messsage:"item added"});
        }
        else{
            const updatedQuantity = products[0].cartItem.quantity+(+req.body.quantity);
            const updatedTotal = products[0].cartItem.subTotal+(+req.body.quantity*(products[0].price));
            await Cart.addProduct(products[0],{
                through:{
                    quantity: updatedQuantity,
                    subTotal: updatedTotal,
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
    const currentPage = +req.query.page || 1;
    try{
        const Cart = await req.user.getCart();
        const cartProducts = await Cart.getProducts(({offset:(PRODUCTS_PER_PAGE*(currentPage-1)),limit:PRODUCTS_PER_PAGE}));
        if(cartProducts.length===0)
        {
            res.status(200).json({
                cartItemList:[],
                cartTotal:0,
                currentPage:1,
                hasPreviousPage: false,
                hasNextPage: false,
            });
        }
        else{
            const cartItemList = [];
            const cartTotalItems = await Cart.countProducts();
            let total=0;
            for(let product of cartProducts)
            {
                const subTotal = product.cartItem.quantity*product.price;
                const cartListItem = {
                    ...product.dataValues,
                    quantity: product.cartItem.quantity,
                    subTotal,
                };
                cartItemList.push(cartListItem);
            }
            const allProducts = await Cart.getProducts();
            for(let product of allProducts)
            {
                total+=product.price*product.cartItem.quantity;
            }   
            cartTotal = (Math.round(total*100))/100;
            res.status(200).json({
                cartItemList:cartItemList,
                cartTotal,
                currentPage,
                hasPreviousPage : currentPage > 1,
                hasNextPage : (PRODUCTS_PER_PAGE*currentPage) < cartTotalItems, 
            });
        }
    }
    catch(err){
        console.log(err);
        res.json(500).json({message:err});
    }
}


