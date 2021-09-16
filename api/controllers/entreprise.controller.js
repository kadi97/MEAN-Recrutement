const mongoose = require("mongoose");

const Entreprise = mongoose.model("Entreprise");

//constant pour la gestion des erreurs
const userError = 400;
const serverError = 500;
const successError = 200;
const notFoundError = 404;


module.exports.entrepriseGetAll = function(req, res) {
    console.log("Get All entreprises");
    const response = {
        status: successError,
        message: res
    }
    Entreprise.find().exec(function (err, entreprises) {
        if (err) {
            console.log("Error finding entreprises ", err);
            // res.status(serverError).json(err);
            response.status = userError;
            response.message = err;
        } else {
            console.log("Found entreprises", entreprises.length);
            // res.status(200).json(entreprises);
            response.status = successError;
            response.message = entreprises;
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.entrepriseAddOne = function (req, res) {
    console.log("Add one entreprise");
    // let dob = req.body.dob;
    // if (!dob){
    //     dob = Date.now();
    // }
    let newEntreprise = {
        nom: req.body.nom,
        adresse: req.body.adresse,
        logo: req.body.logo
    };

    Entreprise.create(newEntreprise, function (err, entreprise) {
        const response = {
            status: successError,
            message: entreprise
        }
        if (err) {
            console.log("Error while creation", err);
            response.status = userError;
            response.message = err;
        } else {
            console.log("Success create Entreprise", entreprise);
            response.status = successError;
            response.message = entreprise;
        }
        res.status(response.status).json(response.message);
    })
}

