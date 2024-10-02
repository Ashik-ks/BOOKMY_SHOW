const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const router = require('./router/movieRouter')

const mongoConnect =  require("../server/db/connect");
mongoConnect();



app.use(express.static('../client'));
app.use('/uploads',express.static("./uploads"));
app.use(express.json())
app.use(express.urlencoded({extended: true }));
app.use(express.json({ limit: "500mb" }));
app.use(router)


app.get('/test',(req,res) =>{
    res.status(200).send('Test successfull')
})



app.listen(process.env.PORT,() =>{
    console.log(`server is running at http://localhost:${process.env.PORT}`)
})