const express = require('express');
const {PORT} = require('./config/serverConfig');
const app = express();
const apiRoutes = require('./routes/index');

//const UserService = require('./services/user-service');

const bodyParser = require('body-parser');
const prepareAndStartServer = ()=> {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api' , apiRoutes);

    


    app.listen(PORT , async()=>{
        console.log(`server is started at ${PORT}`);
    
        const service  = new UserService();
   /*     const newToken = service.createToken({
            email:'sanket@admin.com',
            id:'1'
        })
        console.log(newToken);
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbmtldEBhZG1pbi5jb20iLCJpZCI6IjEiLCJpYXQiOjE2ODc5NzMxNzAsImV4cCI6MTY4Nzk3MzIwMH0.8697yFrylf_dDBs5KZNo3nfu_1VGExId75-2vOFzikY';
        const response = service.verifyToken(token);
        console.log(response);*/
        
    })
}

prepareAndStartServer();