const mongoose = require("mongoose");
const candidatureSchema = require("./candidature-model");
const offre_emploiSchema = require('./offre_emploi-model');
const competence_candidatSchema = require("./competence_candidat-model")

const candidatSchema = new mongoose.Schema({
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
    cv: String,
    email: String,
    dob: {
        type: Date,
        default: Date.now()
    },
    //Liste de candidature

    candidature: [candidatureSchema],
    offre_emploi: [offre_emploiSchema],
    competence_candidat: [competence_candidatSchema]
});

mongoose.model("Candidat", candidatSchema, "candidat");