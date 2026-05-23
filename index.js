const express = require("express");
const mongoose = require("mongoose");

const app = express();


// Middleware
app.use(express.json());


// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/schoolDB");

console.log("MongoDB Connected");


// Schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  course: String,
});


// Model
const Student = mongoose.model(
  "Student",
  studentSchema
);



// HOME ROUTE
app.get("/", (req, res) => {
  res.send("Server Running");
});



// CREATE STUDENT
app.post("/add-student", (req, res) => {

  const newStudent = new Student({
    name: req.body.name,
    age: req.body.age,
    course: req.body.course,
  });

  newStudent.save();

  res.send("Student Saved Successfully");
});



// READ STUDENTS
app.get("/students", (req, res) => {

  Student.find().then((data) => {

    res.json(data);

  });

});



// UPDATE STUDENT
app.put("/update-student", (req, res) => {

  Student.updateOne(

    { name: req.body.oldName },

    {
      name: req.body.newName,
    }

  ).then(() => {

    res.send("Student Updated");

  });

});



// DELETE STUDENT
app.delete("/delete-student", (req, res) => {

  Student.deleteOne({

    name: req.body.name

  }).then(() => {

    res.send("Student Deleted");

  });

});



// START SERVER
app.listen(3000, () => {
  console.log("Server Running On Port 3000");
});