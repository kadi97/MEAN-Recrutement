const mongoose = require("mongoose");
const recruteurSchema  = require("./recruteur-model");
const offre_emploiSchema = require("./offre_emploi-model");

const entrepriseSchema = new mongoose.Schema({
    nom: {
        type:String,
        require: true
    },
    
    adresse: {
        type: String,
        require: true
    },
    logo: {
        type: String
    },
    recruteur: [recruteurSchema],
    offre_emploi = [offre_emploiSchema]

});

mongoose.model("Entreprise", entrepriseSchema, "entreprise");