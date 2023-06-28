const express = require('express');
const {PORT} = require('./config/serverConfig');
const app = express();
const apiRoutes = require('./routes/index');

//const UserRepository = require('./repository/user-repository');

const UserService = require('./services/user-service');
const bodyParser = require('body-parser');
const prepareAndStartServer = ()=> {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api' , apiRoutes);

    


    app.listen(PORT , async()=>{
        console.log(`server is started at ${PORT}`);
        const service = new UserService();
        /*const newToken = await service.createToken({
            email : 'sarthak@admin.com',
            id:2
        })

        console.log(newToken);*/

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhcnRoYWtAYWRtaW4uY29tIiwiaWQiOjIsImlhdCI6MTY4Nzk4NjEzMSwiZXhwIjoxNjg3OTg5NzMxfQ.yOA8wbTLmBPLnzjk7jHcsjSoDlsoEtMmIeLLCmjXUPc";
        const response = service.verifyToken(token);
        console.log(response);
    })
}

prepareAndStartServer();