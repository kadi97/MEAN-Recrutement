const mongoose = require("mongoose");
const candidatureSchema = new mongoose.Schema({
    type_entretien: {
        type:String,
        require: true
    },
    date_entretien: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        require: true
    },
    decision: {
        type: String,
        require: true
    },
});

mongoose.model("Candidature", candidatureSchema, "candidature");