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
    const offre_emploi = {
        intitule: req.body.offre_emploi[0].intitule,
        statut: req.body.offre_emploi[0].statut,
        description: req.body.offre_emploi[0].description,
        date_publication: req.body.offre_emploi[0].date_publication,
        date_fin_publication: req.body.offre_emploi[0].date_fin_publication
    }

    let newType_contrat = {
        nature: req.body.nature,
        dure: req.body.dure, 
        offre_emploi: []
    };

    newType_contrat.offre_emploi.push(offre_emploi);

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


//ligne ajoutee (ici jusqua la fin)
module.exports.type_contratsGetOne = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const type_contratId = req.params.type_contratId;
    const idLength = 24;
    if (type_contratId.length != idLength) {
        res.status(userError).json({ "message": "The length of the type_contrat's ID should be " + idLength });
        return;
    }

    Type_contrat.findById(type_contratId).exec(function (err, doc) {
        if (err) {
            console.log("Found type_contrat error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!doc) {
            console.log("type_contrat ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "type_contrat ID not found" };
        } else {
            console.log("type_contrat found ", doc);
            // res.status(successError).json(doc);
            response.status = successError;
            response.message = doc;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.type_contratsFullUpdate = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const type_contratId = req.params.type_contratId;
    const idLength = 24;
    if (type_contratId.length != idLength) {
        res.status(userError).json({ "message": "The length of the type_contrat's ID should be " + idLength });
        return;
    }

    Type_contrat.findById(type_contratId).exec(function (err, type_contrat) {
        if (err) {
            console.log("Found type_contrat error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!type_contrat) {
            console.log("type_contrat ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "type_contrat ID not found" };
        }
        if (type_contrat) {
            type_contrat.nature = req.body.nature;
            type_contrat.dure = req.body.dure;
            // type_contrat.telephone = req.body.telephone;
            // type_contrat.email = req.body.email;
            // type_contrat.dob = dob;
            // type_contrat.adresse = req.body.adresse;

            type_contrat.save(function (err, updatedtype_contrat) {
                if (err) {
                    console.log("type_contrat not updated");
                    response.status = notFoundError;
                    response.message = { "message": "type_contrat not updated" }
                } else {
                    // response.status = notFoundError;
                    response.message = updatedtype_contrat
                }
                res.status(response.status).json(response.message);
            })
        }
    });

}

module.exports.type_contratsPartialUpdate = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const type_contratId = req.params.type_contratId;
    const idLength = 24;
    if (type_contratId.length != idLength) {
        res.status(userError).json({ "message": "The length of the type_contrat's ID should be " + idLength });
        return;
    }

    Type_contrat.findById(type_contratId).exec(function (err, type_contrat) {
        if (err) {
            console.log("Found type_contrat error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!type_contrat) {
            console.log("type_contrat ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "type_contrat ID not found" };
        } if (type_contrat) {
            
            if (req.body.nature) {
                type_contrat.nature = req.body.nature;
            }
            if (req.body.dure) {
                type_contrat.dure = req.body.dure;
            }
           
            // if (req.body.email) {
            //     type_contrat.email = req.body.email;
            // }
            // if (req.body.telephone) {
            //     type_contrat.telephone = req.body.telephone;
            // }
            // if (req.body.dob) {
            //     type_contrat.dob = req.body.dob;
            // }

            type_contrat.save(function (err, updatedtype_contrat) {
                if (err) {
                    console.log("type_contrat not updated");
                    response.status = notFoundError;
                    response.message = { "message": "type_contrat not updated" }
                } else {
                    // response.status = notFoundError;
                    response.message = updatedtype_contrat
                }
                res.status(response.status).json(response.message);
            })
        }
        // res.status(response.status).json(response.message);
    });
}

module.exports.type_contratsDeleteOne = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const type_contratId = req.params.type_contratId;
    const idLength = 24;
    if (type_contratId.length != idLength) {
        res.status(userError).json({ "message": "The length of the type_contrat's ID should be " + idLength });
        return;
    }

    Type_contrat.findByIdAndRemove(type_contratId).exec(function (err, deletedtype_contrat) {
        if (err) {
            console.log("Found type_contrat error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!deletedtype_contrat) {
            console.log("type_contrat ID not found ");
            // res.status(userError).json(doc);
            response.status = notFoundError;
            response.message = { "message": "type_contrat ID not found" };
        } else {
            console.log("type_contrat deleted ", deletedtype_contrat);
            // res.status(successError).json(doc);
            response.status = successError;
            response.message = deletedtype_contrat;
        }
        res.status(response.status).json(response.message);
    });
}
