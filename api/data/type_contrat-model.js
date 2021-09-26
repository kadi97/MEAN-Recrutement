const mongoose = require("mongoose");
const offre_emploiSchema = require("./offre_emploi-model")

const type_contratSchema = new mongoose.Schema({
    nature: {
        type:String,
        require: true
    },
    dure: {
        type: String,
        require: true
    },

    offre_emploi: [offre_emploiSchema]
});

mongoose.model("Type_contrat", type_contratSchema, "type_contrat");