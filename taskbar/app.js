const express = require('express')
const app = express();
app.use(express.urlencoded({extended:false}))
const {connectdb} =require('./Mongo/connection')
const router = require('./Routes/routes')
const {notfound} =require('./Routes/notfound')
const cors = require('cors');
app.use(cors({
    origin:"*",
}));
require('dotenv').config()
app.use(express.json())

app.use('/',router)


app.use(notfound)

const server = async()=>{
    try{
         await connectdb(process.env.URL)
        app.listen(27017,()=> console.log('Server started'))
    }
    catch(err){
        console.log(err)
    }
}
server()

