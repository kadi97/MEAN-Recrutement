const mongoose = require("mongoose");
const type_contratSchema = require("./type_contrat-model");
const candidatSchema = require("./candidat-model");
const entreprise = require("./entreprise-model");

const offre_emploiSchema = new mongoose.Schema({
    intitule: {
        type:String,
        require: true
    },
    statut: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    date_publication: {
        type: Date,
        default: Date.now()
    },
    date_fin_publication: {
        type: Date,
        default: Date.now()
    },
    candidat = [candidatSchema],
    type_contrat = {type_contratSchema},
    entreprise = {entrepriseSchema}
    
});

mongoose.model("Offre_emploi", offre_emploiSchema, "offre_emploi");