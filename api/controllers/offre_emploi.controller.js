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


//ligne ajoutee (ici jusqua la fin)
module.exports.offre_emploisGetOne = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const offre_emploiId = req.params.offre_emploiId;
    const idLength = 24;
    if (offre_emploiId.length != idLength) {
        res.status(userError).json({ "message": "The length of the offre_emploi's ID should be " + idLength });
        return;
    }

    Offre_emploi.findById(offre_emploiId).exec(function (err, doc) {
        if (err) {
            console.log("Found offre_emploi error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!doc) {
            console.log("offre_emploi ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "offre_emploi ID not found" };
        } else {
            console.log("offre_emploi found ", doc);
            // res.status(successError).json(doc);
            response.status = successError;
            response.message = doc;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.offre_emploisFullUpdate = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const offre_emploiId = req.params.offre_emploiId;
    const idLength = 24;
    if (offre_emploiId.length != idLength) {
        res.status(userError).json({ "message": "The length of the offre_emploi's ID should be " + idLength });
        return;
    }

    Offre_emploi.findById(offre_emploiId).exec(function (err, offre_emploi) {
        if (err) {
            console.log("Found offre_emploi error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!offre_emploi) {
            console.log("offre_emploi ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "offre_emploi ID not found" };
        }
        if (offre_emploi) {
            offre_emploi.intitule = req.body.intitule;
            offre_emploi.statut = req.body.statut;
            offre_emploi.description = req.body.description;
            offre_emploi.date_publication = req.body.date_publication;
            offre_emploi.date_fin_publication = req.body.date_fin_publication;

            offre_emploi.save(function (err, updatedoffre_emploi) {
                if (err) {
                    console.log("offre_emploi not updated");
                    response.status = notFoundError;
                    response.message = { "message": "offre_emploi not updated" }
                } else {
                    // response.status = notFoundError;
                    response.message = updatedoffre_emploi
                }
                res.status(response.status).json(response.message);
            })
        }
    });

}

module.exports.offre_emploisPartialUpdate = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const offre_emploiId = req.params.offre_emploiId;
    const idLength = 24;
    if (offre_emploiId.length != idLength) {
        res.status(userError).json({ "message": "The length of the offre_emploi's ID should be " + idLength });
        return;
    }

    Offre_emploi.findById(offre_emploiId).exec(function (err, offre_emploi) {
        if (err) {
            console.log("Found offre_emploi error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!offre_emploi) {
            console.log("offre_emploi ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "offre_emploi ID not found" };
        } if (offre_emploi) {
            if (req.body.intitule) {
                offre_emploi.intitule = req.body.intitule;
            }
            if (req.body.statut) {
                offre_emploi.statut = req.body.statut;
            }
            if (req.body.description) {
                offre_emploi.description = req.body.description;
            }
            if (req.body.date_publication) {
                offre_emploi.date_publication = req.body.date_publication;
            }
            if (req.body.date_fin_publication) {
                offre_emploi.date_fin_publication = req.body.date_fin_publication;
            }

            offre_emploi.save(function (err, updatedoffre_emploi) {
                if (err) {
                    console.log("offre_emploi not updated");
                    response.status = notFoundError;
                    response.message = { "message": "offre_emploi not updated" }
                } else {
                    // response.status = notFoundError;
                    response.message = updatedoffre_emploi
                }
                res.status(response.status).json(response.message);
            })
        }
        // res.status(response.status).json(response.message);
    });
}

module.exports.offre_emploisDeleteOne = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const offre_emploiId = req.params.offre_emploiId;
    const idLength = 24;
    if (offre_emploiId.length != idLength) {
        res.status(userError).json({ "message": "The length of the offre_emploi's ID should be " + idLength });
        return;
    }

    Offre_emploi.findByIdAndRemove(offre_emploiId).exec(function (err, deletedoffre_emploi) {
        if (err) {
            console.log("Found offre_emploi error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!deletedoffre_emploi) {
            console.log("offre_emploi ID not found ");
            // res.status(userError).json(doc);
            response.status = notFoundError;
            response.message = { "message": "offre_emploi ID not found" };
        } else {
            console.log("offre_emploi deleted ", deletedoffre_emploi);
            // res.status(successError).json(doc);
            response.status = successError;
            response.message = deletedoffre_emploi;
        }
        res.status(response.status).json(response.message);
    });
}
