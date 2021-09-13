const express = require("express")

const controllerCandidat = require("../controllers/candidat.controller");
const controllerRecruteur = require("../controllers/recruteur.controller");

const router = express.Router();
router.route("/candidat")
    .get(controllerCandidat.candidatGetAll)
    .post(controllerCandidat.candidatAddOne)
    ;

router.route("/recruteur")
    .get(controllerRecruteur.recruteurGetAll)
    .post(controllerRecruteur.recruteurAddOne)
    ;


module.exports = router;