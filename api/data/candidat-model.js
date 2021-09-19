const mongoose = require("mongoose");
const candidatureSchema = require("./candidature-model");

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
        type: String
    },
    telephone: {
        type: String
    },
    cv: String,
    email: String,
    dob: {
        type: Date,
        default: Date.now()
    },
    //Liste de candidature
    candidature: [candidatureSchema]
});

mongoose.model("Candidat", candidatSchema, "candidat");