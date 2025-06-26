import { createUser, deleteUser, fetchUser, fetchUsers, updateUser } from "../controller/user.controller.js";
// imported all the controller functions to add routing to it

// export function routes to call it in server.js or index.js with app (server) as parameter
export function Routes(app) {
    app.get("/users", fetchUsers); // fetch all users
    app.get("/users/:id", fetchUser); // fetch detail of a single user
    app.post("/user", createUser); // create a new user
    app.put("/user/:id", updateUser); // update a user info by id
    app.delete("/user/:id", deleteUser); // delete a user by their id
}