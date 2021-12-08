const mongoose = require("mongoose");
const entrepriseSchema = require("./entreprise-model");
const candidatureSchema = require("./candidature-model");
const offreSchema = require("./offre_emploi-model");

const recuteurSchema = new mongoose.Schema({
    nom: {
        type:String,
        require: true
    },
    prenom: {
        type: String,
        require: true
    },
    adresse: {
        type: String,
        require: true
    },
    telephone: {
        type: String,
        require: true
    },
    email: String,
    dob: {
        type: Date,
        default: Date.now()
    },
    //L'entreprise du recruter sous un objet
    entreprise: {entrepriseSchema},
    candidature:[candidatureSchema],
    offrePublier:[offreSchema]


});

mongoose.model("Recruteur", recuteurSchema, "recruteur");