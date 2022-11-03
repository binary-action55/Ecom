module.exports.addOrder = async (req,res,next) =>{
    try{
        const order = await req.user.createOrder();
        const cart =  await req.user.getCart();
        const products =  await cart.getProducts();
        for(let product of products)
        {
            await order.addProduct(product,{
                through:{
                    quantity:product.cartItem.quantity,
                }
            });
            await cart.removeProduct(product);
        }
        
        res.status(201).json({success:true,orderId: order.id});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:err});
    }
}