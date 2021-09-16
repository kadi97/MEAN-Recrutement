const mongoose = require("mongoose");
const type_contratSchema = new mongoose.Schema({
    nature: {
        type:String,
        require: true
    },
    dure: {
        type: String,
        require: true
    }
});

mongoose.model("Type_contrat", type_contratSchema, "type_contrat");