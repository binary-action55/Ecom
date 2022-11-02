const path = require('path');
const rootDirectory = require('../utils/rootDirectory');
const Product = require(path.join(rootDirectory,'model','product'));

module.exports.getAllProducts = (req,res,next)=>{
    Product.findAll()
    .then((products)=>{
        res.status(200).json(products);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({message:err});
    }); 
}

module.exports.addProduct = (req,res,next)=>{
    try{
        if(
           req.body.name==null ||
           req.body.price==null ||
           req.boody.imageURL==null ||
           req.body.category==null ||
           req.body.description==null
        )
        throw new Error("One or more input parameters are null or undefined");
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:err});
    }
    
    Product.create({
        name: req.body.name,
        price: +req.body.price,
        imageURL: req.body.imageURL,
        category: req.body.category,
        description: req.body.description,
    })
    .then(product=>res.status(201).json(product))
    .catch(err=>{
        console.log(err);
        res.status(500).json({message:err});
    });
}