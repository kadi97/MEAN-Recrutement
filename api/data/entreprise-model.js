const mongoose = require("mongoose");
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
    }
});

mongoose.model("Entreprise", entrepriseSchema, "entreprise");