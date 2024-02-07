var express = require("express")
var { graphqlHTTP } = require("express-graphql")
var { buildSchema } = require("graphql")
const schema = require('./Schema/schema')
const mongoose= require("mongoose");
const port = process.env.PORT || 5000;

const app=express();

app.use('/graphql',graphqlHTTP({
  graphiql:true,
  schema:schema
}))


mongoose.connect(`mongodb+srv://newUser:Zhza7gY9bpyyDSHm@cluster0.w7rmmpa.mongodb.net/graphql?retryWrites=true&w=majority`,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  // useCreateIndex:true
})
  .then(()=>{app.listen(port,()=>{
    console.log("Listening in port 5000 ,database is connected")
  })})
  .catch((e)=>console.log(e))
  
console.log("Running a GraphQL API server at http://localhost:4000/graphql")