const mongoose = require("mongoose");
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
    }
});

mongoose.model("Candidat", candidatSchema, "candidat");