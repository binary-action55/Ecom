const path = require('path');
const rootDirectory = require('../utils/rootDirectory');
const Product = require(path.join(rootDirectory,'model','product'));

module.exports.getAllProducts = (req,res,next)=>{
    Product.findAll()
    .then((products)=>{
        res.json(products);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    }); 
}

module.exports.addProduct = (req,res,next)=>{
    Product.create({
        name: req.body.name,
        price: +req.body.price,
        imageURL: req.body.imageURL,
        category: req.body.category,
        description: req.body.description,
    })
    .then(product=>res.json(product))
    .catch(err=>console.log(err));
}