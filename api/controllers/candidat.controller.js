module.exports.candidatGetAll = function(req, res) {
    console.log("Get All candidats");
    const candidats = {
        "message": "List de tous les candidats"
    };
    res.status(200).json(candidats);
}

