const mongoose = require("mongoose");

const Candidat = mongoose.model("Candidat");

//constant pour la gestion des erreurs
const userError = 400;
const serverError = 500;
const successError = 200;
const notFoundError = 404;


module.exports.candidatGetAll = function(req, res) {
    console.log("Get All candidats");
    const response = {
        status: successError,
        message: res
    }
    Candidat.find().exec(function (err, candidats) {
        if (err) {
            console.log("Error finding candidats ", err);
            // res.status(serverError).json(err);
            response.status = userError;
            response.message = err;
        } else {
            console.log("Found candidats", candidats.length);
            // res.status(200).json(candidats);
            response.status = successError;
            response.message = candidats;
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.candidatAddOne = function (req, res) {
    console.log("Add one candidat");
    let dob = req.body.dob;
    if (!dob){
        dob = Date.now();
    }
    let newCandidat = {
        prenom: req.body.prenom,
        nom: req.body.nom,
        telephone: req.body.telephone,
        email: req.body.email,
        dob: dob,
        adresse: req.body.adresse
    };

    Candidat.create(newCandidat, function (err, candidat) {
        const response = {
            status: successError,
            message: candidat
        }
        if (err) {
            console.log("Error while creation", err);
            response.status = userError;
            response.message = err;
        } else {
            console.log("Success create Candidat", candidat);
            response.status = successError;
            response.message = candidat;
        }
        res.status(response.status).json(response.message);
    })
}

