const mongoose = require("mongoose");

const Competence_candidat = mongoose.model("Competence_candidat");

//constant pour la gestion des erreurs
const userError = 400;
const serverError = 500;
const successError = 200;
const notFoundError = 404;


module.exports.competence_candidatGetAll = function(req, res) {
    console.log("Get All competence_candidat");
    const response = {
        status: successError,
        message: res
    }
    Competence_candidat.find().exec(function (err, competence_candidats) {
        if (err) {
            console.log("Error finding competence_candidats ", err);
            // res.status(serverError).json(err);
            response.status = userError;
            response.message = err;
        } else {
            console.log("Found competence_candidats", competence_candidats.length);
            // res.status(200).json(candidats);
            response.status = successError;
            response.message = competence_candidats;
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.competence_candidatAddOne = function (req, res) {
    console.log("Add one competence_candidat");
    // let dob = req.body.dob;
    // if (!dob){
    //     dob = Date.now();
    // }
    let newCompetence_candidat = {
        
        nom_competence: req.body.nom_competence,
        type: req.body.type,
        niveau: req.body.niveau
        // dob: dob,
        // adresse: req.body.adresse
    };

    Competence_candidat.create(newCompetence_candidat, function (err, competence_candidat) {
        const response = {
            status: successError,
            message: competence_candidat
        }
        if (err) {
            console.log("Error while creation", err);
            response.status = userError;
            response.message = err;
        } else {
            console.log("Success create Competence_candidat", competence_candidat);
            response.status = successError;
            response.message = competence_candidat;
        }
        res.status(response.status).json(response.message);
    })
}

