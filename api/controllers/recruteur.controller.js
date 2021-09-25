const mongoose = require("mongoose");

const Recruteur = mongoose.model("Recruteur");

//constant pour la gestion des erreurs
const userError = 400;
const serverError = 500;
const successError = 200;
const notFoundError = 404;


module.exports.recruteurGetAll = function(req, res) {
    console.log("Get All recruteurs");
    const response = {
        status: successError,
        message: res
    }
    Recruteur.find().exec(function (err, recruteurs) {
        if (err) {
            console.log("Error finding recruteurs ", err);
            // res.status(serverError).json(err);
            response.status = userError;
            response.message = err;
        } else {
            console.log("Found recruteurs", recruteurs.length);
            // res.status(200).json(recruteurs);
            response.status = successError;
            response.message = recruteurs;
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.recruteurAddOne = function (req, res) {
    console.log("Add one recruteur");
    let dob = req.body.dob;
    if (!dob){
        dob = Date.now();
    }
    let newRecruteur = {
        prenom: req.body.prenom,
        nom: req.body.nom,
        telephone: req.body.telephone,
        email: req.body.email,
        dob: dob,
        adresse: req.body.adresse,
        entreprise: {}
    };

    // const newEntreprise = {
    //     nom: req.body.entreprise.nom,
    //     adresse: req.body.entreprise.adresse,
    //     logo: req.body.entreprise.logo
    // };
    // newRecruteur.entreprise = newEntreprise;

    Recruteur.create(newRecruteur, function (err, recruteur) {
        const response = {
            status: successError,
            message: recruteur
        }
        if (err) {
            console.log("Error while creation", err);
            response.status = userError;
            response.message = err;
        } else {
            console.log("Success create Recruteur", recruteur);
            response.status = successError;
            response.message = recruteur;
        }
        res.status(response.status).json(response.message);
    })
}



//ligne ajoutee (ici jusqua la fin)
module.exports.recruteursGetOne = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const recruteurId = req.params.recruteurId;
    const idLength = 24;
    if (recruteurId.length != idLength) {
        res.status(userError).json({ "message": "The length of the recruteur's ID should be " + idLength });
        return;
    }

    Recruteur.findById(recruteurId).exec(function (err, doc) {
        if (err) {
            console.log("Found recruteur error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!doc) {
            console.log("recruteur ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "recruteur ID not found" };
        } else {
            console.log("recruteur found ", doc);
            // res.status(successError).json(doc);
            response.status = successError;
            response.message = doc;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.recruteursFullUpdate = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const recruteurId = req.params.recruteurId;
    const idLength = 24;
    if (recruteurId.length != idLength) {
        res.status(userError).json({ "message": "The length of the recruteur's ID should be " + idLength });
        return;
    }

    Recruteur.findById(recruteurId).exec(function (err, recruteur) {
        if (err) {
            console.log("Found recruteur error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!recruteur) {
            console.log("recruteur ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "recruteur ID not found" };
        }
        if (recruteur) {
            recruteur.prenom = req.body.prenom;
            recruteur.nom = req.body.nom;
            recruteur.telephone = req.body.telephone;
            recruteur.email = req.body.email;
            recruteur.dob = req.body.dob;
            recruteur.adresse = req.body.adresse;

            recruteur.save(function (err, updatedrecruteur) {
                if (err) {
                    console.log("recruteur not updated");
                    response.status = notFoundError;
                    response.message = { "message": "recruteur not updated" }
                } else {
                    // response.status = notFoundError;
                    response.message = updatedrecruteur
                }
                res.status(response.status).json(response.message);
            })
        }
    });

}

module.exports.recruteursPartialUpdate = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const recruteurId = req.params.recruteurId;
    const idLength = 24;
    if (recruteurId.length != idLength) {
        res.status(userError).json({ "message": "The length of the recruteur's ID should be " + idLength });
        return;
    }

    Recruteur.findById(recruteurId).exec(function (err, recruteur) {
        if (err) {
            console.log("Found recruteur error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!recruteur) {
            console.log("recruteur ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "recruteur ID not found" };
        } if (recruteur) {
            if (req.body.nom) {
                recruteur.nom = req.body.nom;
            }
            if (req.body.prenom) {
                recruteur.prenom = req.body.prenom;
            }
            if (req.body.email) {
                recruteur.email = req.body.email;
            }
            if (req.body.telephone) {
                recruteur.telephone = req.body.telephone;
            }
            if (req.body.dob) {
                recruteur.dob = req.body.dob;
            }

            recruteur.save(function (err, updatedrecruteur) {
                if (err) {
                    console.log("recruteur not updated");
                    response.status = notFoundError;
                    response.message = { "message": "recruteur not updated" }
                } else {
                    // response.status = notFoundError;
                    response.message = updatedrecruteur
                }
                res.status(response.status).json(response.message);
            })
        }
        // res.status(response.status).json(response.message);
    });
}

module.exports.recruteursDeleteOne = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const recruteurId = req.params.recruteurId;
    const idLength = 24;
    if (recruteurId.length != idLength) {
        res.status(userError).json({ "message": "The length of the recruteur's ID should be " + idLength });
        return;
    }

    Recruteur.findByIdAndRemove(recruteurId).exec(function (err, deletedrecruteur) {
        if (err) {
            console.log("Found recruteur error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!deletedrecruteur) {
            console.log("recruteur ID not found ");
            // res.status(userError).json(doc);
            response.status = notFoundError;
            response.message = { "message": "recruteur ID not found" };
        } else {
            console.log("recruteur deleted ", deletedrecruteur);
            // res.status(successError).json(doc);
            response.status = successError;
            response.message = deletedrecruteur;
        }
        res.status(response.status).json(response.message);
    });
}

