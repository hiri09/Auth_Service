const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {JWT_KEY} = require('../config/serverConfig');
class UserService{

    constructor(){
        this.userRepository = new UserRepository;
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name == "SequelizeValidationError"){
                throw error;
            }
            console.log("Something went wrong in service layer");
            throw {error};
        }
    }
    
    async signIn(email , plainPassword){
        try {
            // step1 : fetch the user by email
            const user = await this.userRepository.getByEmail(email);

            // step2:compare incoming password with stored encypted password

            const passwordMatch = this.checkPassword(plainPassword , user.password);

            if(!passwordMatch){
               console.log("Password doesn'tmatch");
               throw {error};
            }
            const newJWT = this.createToken({email : user.email , id:user.id});
            return newJWT
        } catch (error) {
            console.log("Something went wrong in sign in");
            throw {error};
        }
    }
    
    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);

            if(!response){
                throw {error : 'Invalid Token'};
            }
            console.log("response is " , response );
            const user =await this.userRepository.getById(response.id);

            if(!user){
                throw {error : "No user is found for this token"};
            }

            return user.id;
        } catch (error) {
            console.log("Something went wrong in sign in");
            throw {error};
        }
    }
    
    async createToken(user){
        try {

            const response = jwt.sign(user , JWT_KEY , {expiresIn : '2d'});
            
            return response;

        } catch (error) {
            console.log("Something went wrong in creating in token");
            throw {error};
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token , JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in validation");
            throw error;

        }
    }

    checkPassword(userInputPlainPassword , encyptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword , encyptedPassword);
        } catch (error) {
            console.log("Password is wrong");
            throw {error : "Incorrect Password"};
        }
    }

    isAdmin(userId){
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something is wrong in service layer");
            throw {error};
        }
    }
    
}

module.exports = UserService;