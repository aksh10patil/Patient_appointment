const express = require("express");
const app = express();
const cors = require("cors");
const mainrouter = require("./Routers/index");

//Some middlware type setup
app.use(cors());
app.use(express.json());

//The routing setup     
app.use('/api/v1', mainrouter);


app.listen(3000,()=>{
    console.log("succesfully launched in the localhost 3000")
})