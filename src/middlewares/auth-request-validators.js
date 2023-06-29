const validateUserAuth = (req , res , next)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            data:{},
            message:"Something is missing",
            success:false,
            error:"Email or Password is missing in signup "
        });
    }

    next();
}

const validateIsAdminRequest = (req , res , next)=>{
    if(!req.body.id){
        return res.status(400).json({
            data:{},
            message:"Something is wrong",
            success:false,
            error:"User id not found "
        });
    }
    next();
}
module.exports = {
    validateUserAuth,
    validateIsAdminRequest
}