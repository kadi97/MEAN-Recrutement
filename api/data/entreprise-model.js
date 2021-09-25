const mongoose = require("mongoose");
const recruteurSchema  = require("./recruteur-model");
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
    recruteur: [recruteurSchema]

});

mongoose.model("Entreprise", entrepriseSchema, "entreprise");