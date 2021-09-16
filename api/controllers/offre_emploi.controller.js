const mongoose = require("mongoose");

const Offre_emploi = mongoose.model("Offre_emploi");

//constant pour la gestion des erreurs
const userError = 400;
const serverError = 500;
const successError = 200;
const notFoundError = 404;


module.exports.offre_emploiGetAll = function(req, res) {
    console.log("Get All offre_emplois");
    const response = {
        status: successError,
        message: res
    }
    Offre_emploi.find().exec(function (err, offre_emplois) {
        if (err) {
            console.log("Error finding offre_emplois ", err);
            // res.status(serverError).json(err);
            response.status = userError;
            response.message = err;
        } else {
            console.log("Found offre_emplois", offre_emplois.length);
            // res.status(200).json(offre_emplois);
            response.status = successError;
            response.message = offre_emplois;
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.offre_emploiAddOne = function (req, res) {
    console.log("Add one offre_emploi");
    let date_publication = req.body.date_publication;
    let date_fin_publication = req.body.date_fin_publication;
    if (!date_publication){
        date_publication = Date.now();
    }
    if (!date_fin_publication){
        date_fin_publication = Date.now();
    }
    let newOffre_emploi = {
        intitule: req.body.intitule,
        statut: req.body.statut,
        description: req.body.description,
        date_publication: date_publication,
        date_fin_publication: date_fin_publication
        
    };

    Offre_emploi.create(newOffre_emploi, function (err, offre_emploi) {
        const response = {
            status: successError,
            message: offre_emploi
        }
        if (err) {
            console.log("Error while creation", err);
            response.status = userError;
            response.message = err;
        } else {
            console.log("Success create Offre_emploi", offre_emploi);
            response.status = successError;
            response.message = offre_emploi;
        }
        res.status(response.status).json(response.message);
    })
}

