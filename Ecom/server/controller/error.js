module.exports.error404 = (req,res,next)=>{
    res.status(404).json({message:'page not found'});
}

