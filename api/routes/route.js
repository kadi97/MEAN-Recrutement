const express = require("express")

const controllerCandidat = require("../controllers/candidat.controller");

const router = express.Router();
router.route("/candidat")
    .get(controllerCandidat.candidatGetAll)
    .post(controllerCandidat.candidatAddOne)
    ;


module.exports = router;