const mongoose = require("mongoose");

const Candidature = mongoose.model("Candidature");

//constant pour la gestion des erreurs
const userError = 400;
const serverError = 500;
const successError = 200;
const notFoundError = 404;


module.exports.candidatureGetAll = function(req, res) {
    console.log("Get All candidatures");
    const response = {
        status: successError,
        message: res
    }
    Candidature.find().exec(function (err, candidatures) {
        if (err) {
            console.log("Error finding candidatures ", err);
            // res.status(serverError).json(err);
            response.status = userError;
            response.message = err;
        } else {
            console.log("Found candidatures", candidatures.length);
            // res.status(200).json(candidatures);
            response.status = successError;
            response.message = candidatures;
        }
        res.status(response.status).json(response.message);
    });
};

module.exports.candidatureAddOne = function (req, res) {
    console.log("Add one candidature");
    let dob = req.body.dob;
    if (!dob){
        dob = Date.now();
    }
    
    let newCandidature = {
        type_entretien: req.body.type_entretien,
        date_entretien: req.body.date_entretien,
        status: req.body.status,
        decision: req.body.decision,
        // dob: dob,
        // adresse: req.body.adresse,
         candidat: {},
         recruteur: {}
        // competence_candidature: [],
        // offre_emploi: []
    };
    //ajouter une candidatureure dans la liste
    // newCandidature.candidatureure.push(candidatureure);
    // newCandidature.competence_candidature.push(competence_candidature);
    // newCandidature.offre_emploi.push(offre_emploi);
    //pour suprimer lelelment en haut je fais
    //newCandidature.canadidature.pop()

    Candidature.create(newCandidature, function (err, candidature) {
        const response = {
            status: successError,
            message: candidature
        }
        if (err) {
            console.log("Error while creation", err);
            response.status = userError;
            response.message = err;
        } else {
            console.log("Success create Candidature", candidature);
            response.status = successError;
            response.message = candidature;
        }
        res.status(response.status).json(response.message);
    })
}


//ligne ajoutee (ici jusqua la fin)
module.exports.candidaturesGetOne = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const candidatureId = req.params.candidatureId;
    const idLength = 24;
    if (candidatureId.length != idLength) {
        res.status(userError).json({ "message": "The length of the candidature's ID should be " + idLength });
        return;
    }

    Candidature.findById(candidatureId).exec(function (err, doc) {
        if (err) {
            console.log("Found candidature error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!doc) {
            console.log("candidature ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "candidature ID not found" };
        } else {
            console.log("candidature found ", doc);
            // res.status(successError).json(doc);
            response.status = successError;
            response.message = doc;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.candidaturesFullUpdate = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const candidatureId = req.params.candidatureId;
    const idLength = 24;
    if (candidatureId.length != idLength) {
        res.status(userError).json({ "message": "The length of the candidature's ID should be " + idLength });
        return;
    }

    Candidature.findById(candidatureId).exec(function (err, candidature) {
        if (err) {
            console.log("Found candidature error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!candidature) {
            console.log("candidature ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "candidature ID not found" };
        }
        if (candidature) {
            candidature.type_entretien = req.body.type_entretien;
            candidature.date_entretien = req.body.date_entretien;
            candidature.status = req.body.status;
            candidature.decision = req.body.decision;
            // candidature.dob = req.body.dob;
            // candidature.adresse = req.body.adresse;

            candidature.save(function (err, updatedcandidature) {
                if (err) {
                    console.log("candidature not updated");
                    response.status = notFoundError;
                    response.message = { "message": "candidature not updated" }
                } else {
                    // response.status = notFoundError;
                    response.message = updatedcandidature
                }
                res.status(response.status).json(response.message);
            })
        }
    });

}

module.exports.candidaturesPartialUpdate = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const candidatureId = req.params.candidatureId;
    const idLength = 24;
    if (candidatureId.length != idLength) {
        res.status(userError).json({ "message": "The length of the candidature's ID should be " + idLength });
        return;
    }

    Candidature.findById(candidatureId).exec(function (err, candidature) {
        if (err) {
            console.log("Found candidature error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!candidature) {
            console.log("candidature ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "candidature ID not found" };
        } if (candidature) {
            if (req.body.date_entretien) {
                candidature.date_entretien = req.body.date_entretien;
            }
            if (req.body.type_entretien) {
                candidature.type_entretien = req.body.type_entretien;
            }
            if (req.body.decision) {
                candidature.decision = req.body.decision;
            }
            if (req.body.status) {
                candidature.status = req.body.status;
            }
            // if (req.body.dob) {
            //     candidature.dob = req.body.dob;
            // }

            candidature.save(function (err, updatedcandidature) {
                if (err) {
                    console.log("candidature not updated");
                    response.status = notFoundError;
                    response.message = { "message": "candidature not updated" }
                } else {
                    // response.status = notFoundError;
                    response.message = updatedcandidature
                }
                res.status(response.status).json(response.message);
            })
        }
        // res.status(response.status).json(response.message);
    });
}

module.exports.candidaturesDeleteOne = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const candidatureId = req.params.candidatureId;
    const idLength = 24;
    if (candidatureId.length != idLength) {
        res.status(userError).json({ "message": "The length of the candidature's ID should be " + idLength });
        return;
    }

    Candidature.findByIdAndRemove(candidatureId).exec(function (err, deletedcandidature) {
        if (err) {
            console.log("Found candidature error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!deletedcandidature) {
            console.log("candidature ID not found ");
            // res.status(userError).json(doc);
            response.status = notFoundError;
            response.message = { "message": "candidature ID not found" };
        } else {
            console.log("candidature deleted ", deletedcandidature);
            // res.status(successError).json(doc);
            response.status = successError;
            response.message = deletedcandidature;
        }
        res.status(response.status).json(response.message);
    });
}


