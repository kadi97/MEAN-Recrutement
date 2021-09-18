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
    .get(controllerCandidat.candidatsGetOne)
    .put(controllerCandidat.candidatsFullUpdate)
    .patch(controllerCandidat.candidatsPartialUpdate)
    .delete(controllerCandidat.candidatsDeleteOne)
    ;

router.route("/recruteur")
    .get(controllerRecruteur.recruteurGetAll)
    .post(controllerRecruteur.recruteurAddOne)
    //lignes ajoutees
    .get(controllerRecruteur.recruteursGetOne)
    .put(controllerRecruteur.recruteursFullUpdate)
    .patch(controllerRecruteur.recruteursPartialUpdate)
    .delete(controllerRecruteur.recruteursDeleteOne)
    //fin ligne ajoutee
    ;



router.route("/offre_emploi")
    .get(controllerOffre_emploi.offre_emploiGetAll)
    .post(controllerOffre_emploi.offre_emploiAddOne)
    .get(controllerOffre_emploi.offre_emploisGetOne)
    .put(controllerOffre_emploi.offre_emploisFullUpdate)
    .patch(controllerOffre_emploi.offre_emploisPartialUpdate)
    .delete(controllerOffre_emploi.offre_emploisDeleteOne)
    ;

router.route("/competence_candidat")
    .get(controllerCompetence_candidat.competence_candidatGetAll)
    .post(controllerCompetence_candidat.competence_candidatAddOne)
    .get(controllerCompetence_candidat.competence_candidatsGetOne)
    .put(controllerCompetence_candidat.competence_candidatsFullUpdate)
    .patch(controllerCompetence_candidat.competence_candidatsPartialUpdate)
    .delete(controllerCompetence_candidat.competence_candidatsDeleteOne)
    ;

router.route("/entreprise")
    .get(controllerEntreprise.entrepriseGetAll)
    .post(controllerEntreprise.entrepriseAddOne)
    .get(controllerEntreprise.entreprisesGetOne)
    .put(controllerEntreprise.entreprisesFullUpdate)
    .patch(controllerEntreprise.entreprisesPartialUpdate)
    .delete(controllerEntreprise.entreprisesDeleteOne)
    ;

 router.route("/type_contrat")
    .get(controllerType_contrat.type_contratGetAll)
    .post(controllerType_contrat.type_contratAddOne)
    .get(controllerType_contrat.type_contratsGetOne)
    .put(controllerType_contrat.type_contratsFullUpdate)
    .patch(controllerType_contrat.type_contratsPartialUpdate)
    .delete(controllerType_contrat.type_contratsDeleteOne)
    ;


module.exports = router;