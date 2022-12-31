const express= require("express");
const app= express();
const Connection=require("./Config/db")
var cors= require("cors");

app.use(express.json());
app.use(cors());

var logRouter=require("./Routes/Login.route");
const eventController= require("./Routes/Event.route")

app.get("/", (req,res)=>{
    res.send("Welcome to homepage")
})

app.use("/auth",logRouter);
app.use("/event", eventController)

app.listen(8080,async()=>{
   try{
    await Connection;
    console.log("App connected to db")
    console.log("App connected to port 8080")
   }
   catch(err){
    console.log(err)
   }
})