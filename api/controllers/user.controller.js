const mongoose = require("mongoose");

const User = mongoose.model("User");

//constant pour la gestion des erreurs
const userError = 400;
const serverError = 500;
const successError = 200;
const notFoundError = 404;


module.exports.userGetAll = function(req, res) {
    console.log("Get All users");
    const response = {
        status: successError,
        message: res
    }
    User.find().exec(function (err, users) {
        if (err) {
            console.log("Error finding users ", err);
            response.status = userError;
            response.message = err;
        } else {
            console.log("Found users", users.length);
            response.status = successError;
            response.message = users;
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.userAddOne = function (req, res) {
    console.log("Add one user");
    let newUser = {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    };

    User.find({"username": newUser.username}).exec(function (err, user) {
        const response = {
            status: successError,
            message: user
        }
        if (err) {
            console.log("Username exist deja!", err);
            response.status = serverError;
            response.message = err;
        }  else if (user) {
                console.log("Username deja existant", user);
                response.status = userError;
                response.message = "Ce username exist deja, veuillez en choisir un autre!";
        } else {
            User.create(newUser, function (err, user) {  
                if (err) {
                    console.log("Error while creation", err);
                    response.status = userError;
                    response.message = err;
                } else {
                    console.log("Success create User", user);
                    response.status = successError;
                    response.message = user;
                }
            });
        }
        res.status(response.status).json(response.message);
    });
    
    //res.status(response.status).json(response.message);
}


module.exports.usersGetOne = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const userId = req.params.userId;
    const idLength = 24;
    if (userId.length != idLength) {
        res.status(userError).json({ "message": "The length of the user's ID should be " + idLength });
        return;
    }

    User.findById(userId).exec(function (err, doc) {
        if (err) {
            console.log("Found user error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!doc) {
            console.log("user ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "user ID not found" };
        } else {
            console.log("user found ", doc);
            // res.status(successError).json(doc);
            response.status = successError;
            response.message = doc;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.usersFullUpdate = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const userId = req.params.userId;
    const idLength = 24;
    if (userId.length != idLength) {
        res.status(userError).json({ "message": "The length of the user's ID should be " + idLength });
        return;
    }

    User.findById(userId).exec(function (err, user) {
        if (err) {
            console.log("Found user error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!user) {
            console.log("user ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "user ID not found" };
        }
        if (user) {
            user.username = req.body.username;
            user.password = req.body.password;
            user.role = req.body.role;

            user.save(function (err, updateduser) {
                if (err) {
                    console.log("user not updated");
                    response.status = notFoundError;
                    response.message = { "message": "user not updated" }
                } else {
                    // response.status = notFoundError;
                    response.message = updateduser
                }
                res.status(response.status).json(response.message);
            })
        }
    });

}

module.exports.usersPartialUpdate = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const userId = req.params.userId;
    const idLength = 24;
    if (userId.length != idLength) {
        res.status(userError).json({ "message": "The length of the user's ID should be " + idLength });
        return;
    }

    User.findById(userId).exec(function (err, user) {
        if (err) {
            console.log("Found user error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!user) {
            console.log("user ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "user ID not found" };
        } if (user) {
            if (req.body.password) {
                user.password = req.body.password;
            }
            if (req.body.username) {
                user.username = req.body.username;
            }
            if (req.body.role) {
                user.role = req.body.role;
            }

            user.save(function (err, updateduser) {
                if (err) {
                    console.log("user not updated");
                    response.status = notFoundError;
                    response.message = { "message": "user not updated" }
                } else {
                    // response.status = notFoundError;
                    response.message = updateduser
                }
                res.status(response.status).json(response.message);
            })
        }
        // res.status(response.status).json(response.message);
    });
}

module.exports.usersDeleteOne = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const userId = req.params.userId;
    const idLength = 24;
    if (userId.length != idLength) {
        res.status(userError).json({ "message": "The length of the user's ID should be " + idLength });
        return;
    }

    User.findByIdAndRemove(userId).exec(function (err, deleteduser) {
        if (err) {
            console.log("Found user error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!deleteduser) {
            console.log("user ID not found ");
            // res.status(userError).json(doc);
            response.status = notFoundError;
            response.message = { "message": "user ID not found" };
        } else {
            console.log("user deleted ", deleteduser);
            // res.status(successError).json(doc);
            response.status = successError;
            response.message = deleteduser;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.foundByUsername = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");

    User.find({"username": req.params.username}).exec(function (err, user) {
        if (err) {
            console.log("Found user error", err);
            response.status = userError;
            response.message = err;
        }else if (user){
            console.log("username trouve ", user);
            response.status = successError;
            response.message = user;
        } else {
            console.log("username non trouve!");
            response.status = userError;
            response.message = { "message": "username non trouvé!" };
        } 
        res.status(response.status).json(response.message);
    });
}