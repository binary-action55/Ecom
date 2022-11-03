const PRODUCTS_PER_PAGE = 2;

module.exports.getAllProducts = async (req,res,next)=>{
    const currentPage = +req.query.page || 1;
    const category = req.query.category || 'food';
    try{
        const productCount = await req.user.countProducts({where:{category}});
        const products = await req.user.getProducts({where:{category},offset: (PRODUCTS_PER_PAGE*(currentPage-1)),limit: PRODUCTS_PER_PAGE});
        res.status(200).json({
            products,
            currentPage,
            hasPreviousPage: currentPage>1,
            hasNextPage: (PRODUCTS_PER_PAGE*currentPage) < productCount,
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:err});
    } 
}

module.exports.addProduct = (req,res,next)=>{
    try{
        if(
           req.body.name==null ||
           req.body.price==null ||
           req.body.imageURL==null ||
           req.body.category==null ||
           req.body.description==null
        )
        throw new Error("One or more input parameters are null or undefined");
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:err});
    }
    
    req.user.createProduct({
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