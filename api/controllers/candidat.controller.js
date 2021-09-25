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
    const candidature = {
        type_entretien: req.body.candidature[0].type_entretien,
        status: req.body.candidature[0].status,
        decision:req.body.candidature[0].decision
    }
    let newCandidat = {
        prenom: req.body.prenom,
        nom: req.body.nom,
        telephone: req.body.telephone,
        email: req.body.email,
        dob: dob,
        adresse: req.body.adresse,
        candidature: []
    };
    //ajouter une candidature dans la liste
    newCandidat.candidature.push(candidature);
    //pour suprimer lelelment en haut je fais
    //newCandidat.canadidature.pop()

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


//ligne ajoutee (ici jusqua la fin)
module.exports.candidatsGetOne = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const candidatId = req.params.candidatId;
    const idLength = 24;
    if (candidatId.length != idLength) {
        res.status(userError).json({ "message": "The length of the candidat's ID should be " + idLength });
        return;
    }

    Candidat.findById(candidatId).exec(function (err, doc) {
        if (err) {
            console.log("Found candidat error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!doc) {
            console.log("candidat ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "candidat ID not found" };
        } else {
            console.log("candidat found ", doc);
            // res.status(successError).json(doc);
            response.status = successError;
            response.message = doc;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.candidatsFullUpdate = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const candidatId = req.params.candidatId;
    const idLength = 24;
    if (candidatId.length != idLength) {
        res.status(userError).json({ "message": "The length of the candidat's ID should be " + idLength });
        return;
    }

    Candidat.findById(candidatId).exec(function (err, candidat) {
        if (err) {
            console.log("Found candidat error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!candidat) {
            console.log("candidat ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "candidat ID not found" };
        }
        if (candidat) {
            candidat.prenom = req.body.prenom;
            candidat.nom = req.body.nom;
            candidat.telephone = req.body.telephone;
            candidat.email = req.body.email;
            candidat.dob = req.body.dob;
            candidat.adresse = req.body.adresse;

            candidat.save(function (err, updatedcandidat) {
                if (err) {
                    console.log("candidat not updated");
                    response.status = notFoundError;
                    response.message = { "message": "candidat not updated" }
                } else {
                    // response.status = notFoundError;
                    response.message = updatedcandidat
                }
                res.status(response.status).json(response.message);
            })
        }
    });

}

module.exports.candidatsPartialUpdate = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const candidatId = req.params.candidatId;
    const idLength = 24;
    if (candidatId.length != idLength) {
        res.status(userError).json({ "message": "The length of the candidat's ID should be " + idLength });
        return;
    }

    Candidat.findById(candidatId).exec(function (err, candidat) {
        if (err) {
            console.log("Found candidat error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!candidat) {
            console.log("candidat ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "candidat ID not found" };
        } if (candidat) {
            if (req.body.nom) {
                candidat.nom = req.body.nom;
            }
            if (req.body.prenom) {
                candidat.prenom = req.body.prenom;
            }
            if (req.body.email) {
                candidat.email = req.body.email;
            }
            if (req.body.telephone) {
                candidat.telephone = req.body.telephone;
            }
            if (req.body.dob) {
                candidat.dob = req.body.dob;
            }

            candidat.save(function (err, updatedcandidat) {
                if (err) {
                    console.log("candidat not updated");
                    response.status = notFoundError;
                    response.message = { "message": "candidat not updated" }
                } else {
                    // response.status = notFoundError;
                    response.message = updatedcandidat
                }
                res.status(response.status).json(response.message);
            })
        }
        // res.status(response.status).json(response.message);
    });
}

module.exports.candidatsDeleteOne = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const candidatId = req.params.candidatId;
    const idLength = 24;
    if (candidatId.length != idLength) {
        res.status(userError).json({ "message": "The length of the candidat's ID should be " + idLength });
        return;
    }

    Candidat.findByIdAndRemove(candidatId).exec(function (err, deletedcandidat) {
        if (err) {
            console.log("Found candidat error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!deletedcandidat) {
            console.log("candidat ID not found ");
            // res.status(userError).json(doc);
            response.status = notFoundError;
            response.message = { "message": "candidat ID not found" };
        } else {
            console.log("candidat deleted ", deletedcandidat);
            // res.status(successError).json(doc);
            response.status = successError;
            response.message = deletedcandidat;
        }
        res.status(response.status).json(response.message);
    });
}


