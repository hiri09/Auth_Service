const UserService = require('../services/user-service');

const userService = new UserService();

const create = async(req , res) =>{
    try {
        const response = await userService.create({
            email:req.body.email ,
            password:req.body.password
        })
        return res.status(201).json({
            data:response,
            message:"Successfully created a new user",
            success:true,
            error:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            message:"Something went wrong in controller that not able to create a user",
            success:false,
            error:error
        });

    }
}
const signIn = async(req,res)=>{
    try {
        const response = await userService.signIn(req.body.email , req.body.password);
        return res.status(201).json({
            data:response,
            message:"Successfully sign in",
            success:true,
            error:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            message:"Something went wrong in controller in sign in",
            success:false,
            error:error
        });

    }
}

const isAuthenticated = async(req , res)=>{
    try {
        const token = req.headers['x-access-token'];
        //console.log(token);
        
        const response = await userService.isAuthenticated(token);
        console.log(response);
        return res.status(200).json({
            data:response,
            message:"user is authenticated",
            success:true,
            error:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            message:"Something went wrong in controller in sign in",
            success:false,
            error:error
        });
    }
}
module.exports = {
    create,
    signIn,
    isAuthenticated
}