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

module.exports.getOrders = async (req,res,next) =>{
    try{
        const orders = await req.user.getOrders()
        const orderDetails = [];
        let total = 0;
        for(let order of orders )
        {
            const orderProducts = [];
            const products = await order.getProducts();
            for(let product of products)
            {
                const productItem = {
                    ...product.dataValues,
                    quantity:product.orderItem.quantity,
                }
                total+=(product.price*product.orderItem.quantity);
                orderProducts.push(productItem);
            }
                orderDetails.push({
                id:order.id,
                totalAmount:total,
                date:order.createdAt,
                products: orderProducts,
            });
        }
        res.status(200).json(orderDetails);

    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({message:err});
    }

}