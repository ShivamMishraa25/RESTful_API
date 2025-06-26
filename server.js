import { Routes } from './routes/user.routes.js'; // import Routes function for MVC architecture
import mongoose from 'mongoose'; // import mongoose
import express from 'express'; // import express

const app = express(); // execute express() function to get an app in return

// start the server at PORT 5100
const PORT = 5100;
app.listen(PORT, () => {
    console.log(`the server is running at port : ${PORT}`);
});

// connect database with mongoose
mongoose.connect('mongodb://localhost:27017/')
  .then(() => {
      console.log("database connected successfully"); // if connected 
  })
  .catch(err => {
      console.log(`database could not be connected. error : ${err}`); // if caught an error
});

// middlewares ----------------------------------------------------------------------------------
app.use(express.json()); // inbuilt middleware to parse json payload with express

// global middleware to log statusCode, method and url
app.use((req, res, next) => {
    res.on("finish", () => {
        console.log(`status: ${res.statusCode}`);
        console.log(`method: ${req.method}`);
        console.log(`url: ${req.url}`);
    });
    next(); // go to the next middleware
});

// global middleware for catching server errors
app.use((err, req, res, next) => {
    console.error(err.stack); // console error
    res.status(500).json({ error: "Internal server error" }); // send error status and messsage
});

// global middleware function for validation of recieved payload
function validation(req, res, next) {
    const {id, firstName, lastName, hobby} = req.body; // save data in variables
    
    // if any of the required data doesn't exist then return with an error message
    if(!id || !firstName || !lastName || !hobby) {
        return res.status(400).json({error: `bad request, please fill out all the required data`});
    }
    next(); // if data is present then proceed to next
}

Routes(app); // call routes function for MVC architecture, and pass app as argument to be used in routes