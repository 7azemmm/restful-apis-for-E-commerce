const express = require ('express');

const dotenv= require('dotenv');

const morgan= require('morgan');

dotenv.config({path:'config.env'});

const dbConection=require('./config/database')
const categoryRoute=require('./routes/categoryRoute')

// connect with db

dbConection();


  
// express app
const app= express();

// middleware

app.use(express.json()); //parsing for the data 
if (process.env.NODE_ENV === 'development' ){

    app.use(morgan('dev'));  // logging for our api request ---- morgan is a  logger http request (middleware)
     console.log(`our enivronment mode is ${process.env.NODE_ENV}`);
}





// Mount Routes*********************

app.use('/api/v1/categories', categoryRoute);






const PORT=process.env.PORT || 8000 ;
app.listen(PORT, ()=>{
    console.log(`app is running succefully on port ${PORT} `);
});