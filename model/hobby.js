const mongoose=require("mongoose");
const MSchema=mongoose.Schema;

const hobySchema=new MSchema({
    title:String,
   description:String,
})

module.exports=mongoose.model("Hoby",hobySchema);