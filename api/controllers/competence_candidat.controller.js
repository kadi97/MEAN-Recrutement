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
        niveau: req.body.niveau,
        // dob: dob,
        // adresse: req.body.adresse
        candidat: {}
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


//ligne ajoutee (ici jusqua la fin)
module.exports.competence_candidatsGetOne = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const competence_candidatId = req.params.competence_candidatId;
    const idLength = 24;
    if (competence_candidatId.length != idLength) {
        res.status(userError).json({ "message": "The length of the competence_candidat's ID should be " + idLength });
        return;
    }

    Competence_candidat.findById(competence_candidatId).exec(function (err, doc) {
        if (err) {
            console.log("Found competence_candidat error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!doc) {
            console.log("competence_candidat ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "competence_candidat ID not found" };
        } else {
            console.log("competence_candidat found ", doc);
            // res.status(successError).json(doc);
            response.status = successError;
            response.message = doc;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.competence_candidatsFullUpdate = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const competence_candidatId = req.params.competence_candidatId;
    const idLength = 24;
    if (competence_candidatId.length != idLength) {
        res.status(userError).json({ "message": "The length of the competence_candidat's ID should be " + idLength });
        return;
    }

    Competence_candidat.findById(competence_candidatId).exec(function (err, competence_candidat) {
        if (err) {
            console.log("Found competence_candidat error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!competence_candidat) {
            console.log("competence_candidat ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "competence_candidat ID not found" };
        }
        if (competence_candidat) {
            competence_candidat.nom_competence = req.body.nom_competence;
            competence_candidat.type = req.body.type;
            competence_candidat.niveau = req.body.niveau;

            competence_candidat.save(function (err, updatedcompetence_candidat) {
                if (err) {
                    console.log("competence_candidat not updated");
                    response.status = notFoundError;
                    response.message = { "message": "competence_candidat not updated" }
                } else {
                    // response.status = notFoundError;
                    response.message = updatedcompetence_candidat
                }
                res.status(response.status).json(response.message);
            })
        }
    });

}

module.exports.competence_candidatsPartialUpdate = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const competence_candidatId = req.params.competence_candidatId;
    const idLength = 24;
    if (competence_candidatId.length != idLength) {
        res.status(userError).json({ "message": "The length of the competence_candidat's ID should be " + idLength });
        return;
    }

    Competence_candidat.findById(competence_candidatId).exec(function (err, competence_candidat) {
        if (err) {
            console.log("Found competence_candidat error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!competence_candidat) {
            console.log("competence_candidat ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "competence_candidat ID not found" };
        } if (competence_candidat) {
            if (req.body.nom_competence) {
                competence_candidat.nom_competence = req.body.nom_competence;
            }
            if (req.body.type) {
                competence_candidat.type = req.body.type;
            }
            if (req.body.niveau) {
                competence_candidat.niveau = req.body.niveau;
            }
            // if (req.body.telephone) {
            //     competence_candidat.telephone = req.body.telephone;
            // }
            // if (req.body.dob) {
            //     competence_candidat.dob = req.body.dob;
            // }

            competence_candidat.save(function (err, updatedcompetence_candidat) {
                if (err) {
                    console.log("competence_candidat not updated");
                    response.status = notFoundError;
                    response.message = { "message": "competence_candidat not updated" }
                } else {
                    // response.status = notFoundError;
                    response.message = updatedcompetence_candidat
                }
                res.status(response.status).json(response.message);
            })
        }
        // res.status(response.status).json(response.message);
    });
}

module.exports.competence_candidatsDeleteOne = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const competence_candidatId = req.params.competence_candidatId;
    const idLength = 24;
    if (competence_candidatId.length != idLength) {
        res.status(userError).json({ "message": "The length of the competence_candidat's ID should be " + idLength });
        return;
    }

    Competence_candidat.findByIdAndRemove(competence_candidatId).exec(function (err, deletedcompetence_candidat) {
        if (err) {
            console.log("Found competence_candidat error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!deletedcompetence_candidat) {
            console.log("competence_candidat ID not found ");
            // res.status(userError).json(doc);
            response.status = notFoundError;
            response.message = { "message": "competence_candidat ID not found" };
        } else {
            console.log("competence_candidat deleted ", deletedcompetence_candidat);
            // res.status(successError).json(doc);
            response.status = successError;
            response.message = deletedcompetence_candidat;
        }
        res.status(response.status).json(response.message);
    });
}

