const express = require('express');
const {PORT} = require('./config/serverConfig');
const app = express();
const apiRoutes = require('./routes/index');

//const UserRepository = require('./repository/user-repository');
//const {User , Role} = require('./models/index');
const UserService = require('./services/user-service');
const bodyParser = require('body-parser');
const prepareAndStartServer = ()=> {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api' , apiRoutes);

    


    app.listen(PORT , async()=>{
        console.log(`server is started at ${PORT}`);
        //const service = new UserService();
        /*
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter : true});
        }*/
        /*const newToken = await service.createToken({
            email : 'sarthak@admin.com',
            id:2
        })

        console.log(newToken);*/
        /*
        const u1 = await User.findByPk(4);
        const r1 = await Role.findByPk(2);
        //u1.addRole(r1);

        //const response = await u1.getRoles();
        const response = await r1.getUsers();
        console.log(response);*/
        
    })
}

prepareAndStartServer();