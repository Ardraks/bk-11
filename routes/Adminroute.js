const Adminmodel = require("../model/Admin");
const app = require('express').Router()

app.post('/adminview', async (request, response) => {
  
    const { username, email, password } = request.body;
    
      try {
        
        // Basic validation
        if (!username || !email || !password) {
          return response.status(400).json({ message: 'All fields are required' });
        }
    
        // Check if the email already exists
        const existingUser = await Adminmodel.findOne({ email });
        if (existingUser) {
          return response.status(400).json({ message: 'Email already registered' });
        }
        // Create a new user
      const newUser = new Adminmodel({ username, email, password });
      await newUser.save();
  
      response.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Internal Server Error' });
    }
  });


  app.post ('/adloginview', async (request, response) => {
    const { email, password } = request.body;
    // console.log(request.body)
    const user = await Adminmodel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password){
        response.json({ success: true, message: 'Login successful',username: user.email   });
      }
       else {
        response.json({ success: false, message: 'Invalid Password and email' });
      }
    }
    
    })
  })


  module.exports=app