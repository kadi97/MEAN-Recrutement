const mongoose = require("mongoose");

const Type_contrat = mongoose.model("Type_contrat");

//constant pour la gestion des erreurs
const userError = 400;
const serverError = 500;
const successError = 200;
const notFoundError = 404;


module.exports.type_contratGetAll = function(req, res) {
    console.log("Get All type_contrats");
    const response = {
        status: successError,
        message: res
    }
    Type_contrat.find().exec(function (err, type_contrats) {
        if (err) {
            console.log("Error finding type_contrats ", err);
            // res.status(serverError).json(err);
            response.status = userError;
            response.message = err;
        } else {
            console.log("Found type_contrats", type_contrats.length);
            // res.status(200).json(type_contrats);
            response.status = successError;
            response.message = type_contrats;
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.type_contratAddOne = function (req, res) {
    console.log("Add one type_contrat");
    // let date_publication = req.body.date_publication;
    // let date_fin_publication = req.body.date_fin_publication;
    // if (!date_publication){
    //     date_publication = Date.now();
    // }
    // if (!date_fin_publication){
    //     date_fin_publication = Date.now();
    // }
    let newType_contrat = {
        nature: req.body.nature,
        dure: req.body.dure
    };

    Type_contrat.create(newType_contrat, function (err, type_contrat) {
        const response = {
            status: successError,
            message: type_contrat
        }
        if (err) {
            console.log("Error while creation", err);
            response.status = userError;
            response.message = err;
        } else {
            console.log("Success create Type_contrat", type_contrat);
            response.status = successError;
            response.message = type_contrat;
        }
        res.status(response.status).json(response.message);
    })
}

