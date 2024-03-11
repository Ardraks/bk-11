const mongoose=require("mongoose")

let sc=mongoose.Schema;
const Adminschema=new sc(
    {
        username:String,
        email:String,
        password:String,
    
    } 
);
var Adminmodel =mongoose.model("admin",Adminschema)
module.exports=Adminmodel;