const mongoose = require("mongoose");
const recruteurSchema = require ("./recruteur-model");
const candidatSchema = require("./candidat-model");

const candidatureSchema = new mongoose.Schema({
    type_entretien: {
        type:String,
        require: true
    },
    date_entretien: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        require: true
    },
    decision: {
        type: String,
        require: true
    },

    recruteur: [recruteurSchema],
    candidat: {candidatSchema}

});

mongoose.model("Candidature", candidatureSchema, "candidature");