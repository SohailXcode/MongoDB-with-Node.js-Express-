const express = require("express")
const mongoose = require("mongoose")

const app = express();

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/schoolDB")
console.log("mongodb connected")

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    course: String
})

const Student = mongoose.model(
    "Student",
    studentSchema
)

app.get("/",(req,res)=>{
    res.send("server is running")
})

app.post("/add-student",(req,res)=>{
    const newStudent = new Student({
        name:req.body.name,
        age:req.body.age,
        course:req.body.course,
    })
    newStudent.save()
    res.send("student saved")
})

app.get("/students",(req,res)=>{
    Student.find().then((data)=>{
        res.json(data)
    })
})

app.put("/update-student",(req,res)=>{
    Student.updateOne(
        {name: req.body.oldName},
        {name:req.body.newName}
    ).then(()=>{
        res.send("student updated")
    })
})

app.delete("/delete-student",(req,res)=>{
    Student.deleteOne({
        name: req.body.name
    })
    .then(()=>{
        res.send("student deleted")
    })
})

app.listen(8000,()=>{
    console.log("server running on port 8000")
})