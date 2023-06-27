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
            message:"Something went wrong in controller",
            success:false,
            error:error
        });

    }
}

module.exports = {
    create
}