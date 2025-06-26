import userModel from "../model/user.model.js"; // import user model

// fetch all users from user model
export async function fetchUsers(req, res) {

    // try and catch blocks for clean code
    try {
        const users = await userModel.find({}); // find all users
        res.status(200).json(users); // return array of all users with 200 status
    } catch (err) {
        res.status(500).json({message: "an error occured"}); // send error message if any error is caught
    }
}

// fetch detail of a single user
export async function fetchUser(req, res) {
    try {
        const {id} = req.params; // get id from url (dynamic routing)
        const userDetail = await userModel.findById(id); // find the user by that id

        // if user is not found send error 404
        if (!userDetail) {
            return res.status(404).json({message: 'user not found'});
        }
        res.status(200).json(userDetail); // send the user's detail
    } catch (err) {
        res.status(500).json({message: "an error occured"});
    }
}

export async function createUser(req, res) {
    try {
        const newUser = await userModel.create(req.body); // create new user from payload (req.body)
        res.status(201).json(newUser); // send new user as response
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

export async function updateUser(req, res) {
    try {
        const {id} = req.params;

        // find user by id and update that user with the requested payload
        const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {new: true}); // new:true to output new data
        
        // if user is not found, send error 404
        if(!updatedUser) {
            return res.status(404).json({message: "user not found"});
        }
        res.status(200).json(updatedUser); // send user's updated data
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

export async function deleteUser(req, res) {
    try {
        const {id} = req.params;
        const deleted = await userModel.findByIdAndDelete(id); // find user by dynamic routing's id, and delete

        // if user not found send error 404
        if(!deleted) {
            return res.status(404).json({message: "user not found"});
        }
        res.status(200).json({message: "user deleted successfully"}); // send success message in json with status 200
    } catch (err) {
        res.status(500).json({message: "an error occured"});
    }
}