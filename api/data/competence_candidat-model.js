const mongoose = require("mongoose");
const candidatSchema = require("./candidat-model");
const competence_candidatSchema = new mongoose.Schema({
    nom_competence: {
        type:String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    niveau: {
        type: String,
        require: true
    },

    candidat: [candidatSchema]

});

mongoose.model("Competence_candidat", competence_candidatSchema, "competence_candidat");