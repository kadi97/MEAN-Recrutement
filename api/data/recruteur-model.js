const mongoose = require("mongoose");
const recuteurSchema = new mongoose.Schema({
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
    
});

mongoose.model("Recruteur", recuteurSchema, "recruteur");