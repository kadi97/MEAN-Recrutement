const mongoose = require("mongoose");
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
    }
});

mongoose.model("Offre_emploi", offre_emploiSchema, "offre_emploi");