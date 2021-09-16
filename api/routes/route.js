const express = require("express")

const controllerCandidat = require("../controllers/candidat.controller");
const controllerRecruteur = require("../controllers/recruteur.controller");
const controllerOffre_emploi = require("../controllers/offre_emploi.controller");
const controllerCompetence_candidat = require("../controllers/competence_candidat.controller");
const controllerEntreprise = require("../controllers/entreprise.controller");
const controllerType_contrat = require("../controllers/type_contrat.controller");

const router = express.Router();
router.route("/candidat")
    .get(controllerCandidat.candidatGetAll)
    .post(controllerCandidat.candidatAddOne)
    ;

router.route("/recruteur")
    .get(controllerRecruteur.recruteurGetAll)
    .post(controllerRecruteur.recruteurAddOne)
    ;

router.route("/offre_emploi")
    .get(controllerOffre_emploi.offre_emploiGetAll)
    .post(controllerOffre_emploi.offre_emploiAddOne)
    ;

router.route("/competence_candidat")
    .get(controllerCompetence_candidat.competence_candidatGetAll)
    .post(controllerCompetence_candidat.competence_candidatAddOne)
    ;

router.route("/entreprise")
    .get(controllerEntreprise.entrepriseGetAll)
    .post(controllerEntreprise.entrepriseAddOne)
    ;

 router.route("/type_contrat")
    .get(controllerType_contrat.type_contratGetAll)
    .post(controllerType_contrat.type_contratAddOne)
    ;


module.exports = router;