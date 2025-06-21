import express from 'express';

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

const app = express();

const PORT = 5100;
app.listen(PORT, () => {
    console.log(`the server is running at port : ${PORT}`);
});

app.use(express.json());

app.get("/users", (req, res) => {
    return res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = users.find(user => user.id == userId);
    
    if(!user) {
        return res.status(404).json({message: `user with the id: ${userId} could not be found.`});
    }
    return res.status(200).json(user);
});

app.post("/users", (req, res) => {
    const user = req.body;
    users.push(user);

    return res.status(201).json(users);
});

app.put("/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = users.find(user => user.id == userId);

    if(!user) {
        return res.status(404).json({message: `user with the id: ${userId} could not be found.`});
    }

});