const mongoose = require("mongoose");
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
    }
});

mongoose.model("Competence_candidat", competence_candidatSchema, "competence_candidat");