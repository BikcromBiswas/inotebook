 const mongoose = require('mongoose');
 const mongoURI = "mongodb://127.0.0.1:27017/Notebook";
const  connectToMongo = async()=>
{
   await mongoose.connect(mongoURI).then((res)=>
    {
        console.log("connected to mongoose succesfully")
    },err=>
    {
        console.log(err)
    })
    console.log("Hello world")
}
module.exports = connectToMongo;