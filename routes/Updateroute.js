const app = require("express").Router();
const multer = require("multer");

const updatemodel = require("../model/Update");
const Registermodel = require("../model/Register");
const storage = multer.memoryStorage(); // Store images in memory
const upload = multer({ storage: storage });

//for saving post
app.post("/pnew", upload.single("profilephoto"), async (request, response) => {
  // // try {

  const { username, email, password } = request.body;
  const newdata = new updatemodel({
    username,
    email,
    password,
    profilephoto: {
      data: request.file.buffer,
      contentType: request.file.mimetype,
    },
  });
  await newdata.save();
  response.status(200).json({ message: " successfully" });
  // }
  // catch (error)
  // {
  //             response.status(500).json({ error: 'Internal Server Error' });
  // }
});

app.put("/sedit/:id", async (request, response) => {
  let id = request.params.id;
  await updatemodel.findByIdAndUpdate(id, request.body);
  response.send("Record updated");
});

app.put("/user/:id", (req, res) => {
  Registermodel.findByIdAndUpdate(req.params.id, req.body).then((data) => {
    // console.log(data);

    const imagePath = `./public/images/${data._id}.jpg`;

    if (req.files) {
      req.files.profilephoto.mv(imagePath, (err) => {
        if (!err) {
          console.log("Product updated successfully:");
          res.send({ data });
        } else {
          console.error("Error uploading image:", err);
          return res.status(500).json({ error: "Image upload failed" });
        }
      });
    } else {
      res.send({ data });
    }
  });
});

module.exports = app;
