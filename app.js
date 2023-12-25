require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require('morgan');
const port = process.env.PORT || 3001


//fr App security
app.use(helmet())

//to handle cors erreur
app.use(cors());

//MongoDB Connection Setup
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)


if(process.env.NODE_ENV !== 'production'){
    mongoose.connection.on('error', err => {
        console.log('hhhhhhhhhhh',err);
      });
      mongoose.connection.on('open', () => {
        console.log('connected !');
      });
    //Logger
        app.use(morgan("tiny"));

      //mongo url
      console.log(process.env.MONGO_URL)
}



//set bodyparser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())




// Load routers

const userRouter = require('./src/routers/user.router')
const ticketRouter = require('./src/routers/ticket.router')
const tokensRouter = require('./src/routers/tokens.router')



// use Routers
app.use('/v1/user',userRouter);
app.use('/v1/ticket',ticketRouter);
app.use('/v1/token',tokensRouter);
// error  handler 
const handleError = require('./src/utils/errorHandler')
app.use((req,res,next)=>{
    const error = new Error("Resources not found !")
    error.status = 404 ;
    next(error)
})

app.use((error,req,res,next)=>{
    handleError(error,res)
})



app.listen(port , ()=>{
    console.log(`API is ready on http://localhost:${port}`);
});