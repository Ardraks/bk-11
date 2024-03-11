// const { request, response } = require('express');

const app = require("express").Router();
const multer = require("multer");
const Writemodel = require("../model/Write");
const storage = multer.memoryStorage(); // Store images in memory
const upload = multer({ storage: storage });

app.get("/writeview", async (request, response) => {
  var data = await Writemodel.find();
  response.send(data);
});

//for saving post

app.post("/writesnew", async (request, response) => {

  console.log(request.body)

  try {
    console.log("Received a request to create a new write.");

    // Logging the uploaded file
    console.log("Uploaded file:", request.files);

    // Extracting title and desc from request body
    const { title, desc } = request.body;

    // Accessing the uploaded file
    const imageFile = request.files.image;

    // Creating a new instance of Writemodel with the provided data
    const newWrite = new Writemodel({
      title,
      desc,
      image: {
        data: imageFile.data,
        contentType: imageFile.mimetype,
      },
    });

    // Saving the new data to the database
    await newWrite.save();

    // Sending a success response
    response.status(200).json({ message: "Write created successfully." });
  } catch (error) {
    console.error("Error creating new write:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

//
app.get("/writesview", async (request, response) => {
  var data = await Writemodel.find();
  response.send(data);
});

//   app.get('/postview/:id',async(request,response)=>{
//     const { id } = req.params
//    Writemodel.findById(id).then(data => {
//         res.send(data)
//     })
// })

app.get("/view1/:id", (request, response) => {
  const { id } = request.params;
  Writemodel.findById(id).then((data) => {
    console.log(data);
    response.send(data);
  });
});

module.exports = app;
