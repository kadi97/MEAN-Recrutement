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
    const offre_emploi = {
        intitule: req.body.offre_emploi[0].intitule,
        statut: req.body.offre_emploi[0].statut,
        description: req.body.offre_emploi[0].description,
        date_publication: req.body.offre_emploi[0].date_publication,
        date_fin_publication: req.body.offre_emploi[0].date_fin_publication
    }

    const recruteur = {
        nom: req.body.recruteur[1].nom,
        prenom: req.body.recruteur[1].prenom,
        adresse: req.body.recruteur[1].adresse,
        telephone: req.body.recruteur[1].telephone
    }

    let newEntreprise = {
        nom: req.body.nom,
        adresse: req.body.adresse,
        logo: req.body.logo,
        offre_emploi: [],
        recruteur: []
    };

    newEntreprise.offre_emploi.push(offre_emploi);
    newEntreprise.recruteur.push(recruteur);


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



//ligne ajoutee (ici jusqua la fin)
module.exports.entreprisesGetOne = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const entrepriseId = req.params.entrepriseId;
    const idLength = 24;
    if (entrepriseId.length != idLength) {
        res.status(userError).json({ "message": "The length of the entreprise's ID should be " + idLength });
        return;
    }

    Entreprise.findById(entrepriseId).exec(function (err, doc) {
        if (err) {
            console.log("Found entreprise error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!doc) {
            console.log("entreprise ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "entreprise ID not found" };
        } else {
            console.log("entreprise found ", doc);
            // res.status(successError).json(doc);
            response.status = successError;
            response.message = doc;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.entreprisesFullUpdate = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const entrepriseId = req.params.entrepriseId;
    const idLength = 24;
    if (entrepriseId.length != idLength) {
        res.status(userError).json({ "message": "The length of the entreprise's ID should be " + idLength });
        return;
    }

    Entreprise.findById(entrepriseId).exec(function (err, entreprise) {
        if (err) {
            console.log("Found entreprise error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!entreprise) {
            console.log("entreprise ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "entreprise ID not found" };
        }
        if (entreprise) {

            entreprise.nom = req.body.nom;
            entreprise.adresse = req.body.adresse;
            entreprise.logo = req.body.logo;
           
            
            entreprise.save(function (err, updatedentreprise) {
                if (err) {
                    console.log("entreprise not updated");
                    response.status = notFoundError;
                    response.message = { "message": "entreprise not updated" }
                } else {
                    // response.status = notFoundError;
                    response.message = updatedentreprise
                }
                res.status(response.status).json(response.message);
            })
        }
    });

}

module.exports.entreprisesPartialUpdate = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const entrepriseId = req.params.entrepriseId;
    const idLength = 24;
    if (entrepriseId.length != idLength) {
        res.status(userError).json({ "message": "The length of the entreprise's ID should be " + idLength });
        return;
    }

    Entreprise.findById(entrepriseId).exec(function (err, entreprise) {
        if (err) {
            console.log("Found entreprise error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!entreprise) {
            console.log("entreprise ID not found ");
            // res.status(userError).json(doc);
            response.status = userError;
            response.message = { "message": "entreprise ID not found" };
        } if (entreprise) {
            if (req.body.nom) {
                entreprise.nom = req.body.nom;
            }
            if (req.body.adresse) {
                entreprise.adresse = req.body.adresse;
            }
            if (req.body.logo) {
                entreprise.logo = req.body.logo;
            }
            
            entreprise.save(function (err, updatedentreprise) {
                if (err) {
                    console.log("entreprise not updated");
                    response.status = notFoundError;
                    response.message = { "message": "entreprise not updated" }
                } else {
                    // response.status = notFoundError;
                    response.message = updatedentreprise
                }
                res.status(response.status).json(response.message);
            })
        }
        // res.status(response.status).json(response.message);
    });
}

module.exports.entreprisesDeleteOne = function (req, res) {
    const response = {
        status: successError,
        message: res
    }
    console.log("Json request received");
    const entrepriseId = req.params.entrepriseId;
    const idLength = 24;
    if (entrepriseId.length != idLength) {
        res.status(userError).json({ "message": "The length of the entreprise's ID should be " + idLength });
        return;
    }

    Entreprise.findByIdAndRemove(entrepriseId).exec(function (err, deletedentreprise) {
        if (err) {
            console.log("Found entreprise error", err);
            //res.status(200).json(err);
            response.status = userError;
            response.message = err;
        } else if (!deletedentreprise) {
            console.log("entreprise ID not found ");
            // res.status(userError).json(doc);
            response.status = notFoundError;
            response.message = { "message": "entreprise ID not found" };
        } else {
            console.log("entreprise deleted ", deletedentreprise);
            // res.status(successError).json(doc);
            response.status = successError;
            response.message = deletedentreprise;
        }
        res.status(response.status).json(response.message);
    });
}


