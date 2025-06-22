import express from 'express'; // import express

// define users data
let users = [
    {
        id: 1,
        firstName: "Shivam",
        lastName: "Mishra",
        hobby: "Doodling"
    },
    {
        id: 2,
        firstName: "Rizzwan",
        lastName: "Ahmed",
        hobby: "FreeFire"
    },
    {
        id: 3,
        firstName: "Keshav",
        lastName: "Mishra",
        hobby: "Clowning"
    },
];

const app = express(); // execute express() function to get an app in return

// start the server at PORT 5100
const PORT = 5100;
app.listen(PORT, () => {
    console.log(`the server is running at port : ${PORT}`);
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


// defining CRUD with RESTful API for users -----------------------------------------------------
app.get("/users", (req, res) => {
    return res.status(200).json(users); // return users with 200 status
});

app.get("/users/:id", (req, res) => {
    const userId = req.params.id; // get userId from url's param
    const user = users.find(user => user.id == userId); // find the user with that id
    
    //if user doesn't exist, send status 404
    if(!user) {
        return res.status(404).json({message: `user with the id: ${userId} could not be found.`});
    }
    return res.status(200).json(user); // send status 200 with users data if found
});

app.post("/users", validation, (req, res) => {
    const user = req.body; // get the user from req.body
    users.push(user); // push user inside the users array

    return res.status(201).json(users); // send 201 status and users array
});

app.put("/users/:id", validation, (req, res) => {
    const userId = req.params.id;
    const user = users.find(user => user.id == userId);

    if(!user) {
        return res.status(404).json({message: `user with the id: ${userId} could not be found.`});
    }
    
    const keys = Object.keys(req.body); // this method return an array of given object's keys
    // we take each key and update the user with the value of that key from req.body (recieved payload)
    keys.forEach(key => {
        user[key] = req.body[key];
    });

    return res.status(200).json(users); // send 200 status and users data
});

app.delete("/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = users.find(user => user.id == userId);

    // if user not found send status 404 with a message
    if(!user) {
        return res.status(404).json({message: `user with the id: ${userId} could not be found.`});
    }

    // if user is found, update the users array with filtered users array
    users = users.filter(userObj => userObj != user);
    return res.status(200).json(users); // return the updated users array
});