const app = require("./app")
require('dotenv').config()
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;
const url = process.env.URL

mongoose
    .connect(url)
    .then(()=>{
        console.log("DB Connected");
        app.listen(port, () =>{
            console.log(`Server is running at ${port}`)
        })
    })
    .catch((err)=> console.log(err))


