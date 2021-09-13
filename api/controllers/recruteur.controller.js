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
        adresse: req.body.adresse
    };

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

