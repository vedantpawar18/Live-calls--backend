const {Router} = require("express");
const EventModel= require("../Model/Event.model")
const LoginModel= require("../Model/Login.model")
const eventController= Router();

eventController.get("/allevents", async(req,res)=>{
    const AllEvents= await EventModel.find({});
    res.send(AllEvents)
})

eventController.post("/createevent", async(req,res)=>{
    const {Eventname, Description, Date, StartTime, EndTIme, Limit, Enrolled}= req.body;

    const Event= new EventModel ({
        Eventname, Description, Date, StartTime, EndTIme, Limit, Enrolled
    });

    try{
        await Event.save();
        res.send("Event created")
    }
    catch(err){
        console.log(err);
        res.send("Error while creating event")
    }
} );

eventController.patch("/joinevent/:eventid/:id", async(req, res)=>{
    const id=req.params.id;
    const eventid=req.params.eventid; 

    const Name= await LoginModel.findOne({_id:id});
    const updatedName= Name.name;

    const Datareq = await EventModel.findOne({ _id:eventid });
    const enrolledEvents= Name.enrolledEvents
    const Enrolled= Datareq.Enrolled
    const enrolledEventName=Datareq.Eventname
    console.log("Name",Enrolled, Datareq, enrolledEventName);
    const Limit= Datareq.Limit;

    if(Name && Enrolled.length<Limit){
    const Data = await EventModel.findOneAndUpdate({ _id:eventid },{$set:{Enrolled:[...Enrolled,updatedName]}})
    const updatedData=await EventModel.find({_id:eventid})
    res.send({messege:"Updated Suceesfully",updatedData})
    const UserData = await LoginModel.findOneAndUpdate({ _id:id },{$set:{enrolledEvents:[...enrolledEvents,enrolledEventName]}})
    }
    else{
        res.send("Limit exceeded")
    }
    
})

eventController.get("/searchtitle/:title", async (req, res) => {
    let { title } = req.params;
    console.log("title", title);
    const eventData = await EventModel.find({});
    console.log(eventData)
    let val = [];
    
        for (let i = 0; i < eventData.length; i++) {
            let tc = title.toLowerCase();
            if (eventData[i].Eventname && eventData[i].Eventname.toLowerCase() === tc) {
              val.push(eventData[i]);
            }
            
          }
    
    res.send(val);
  });


module.exports= eventController