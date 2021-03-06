const express = require("express");
require("./api/data/db");
const app = express();
const route = require("./api/routes/route");
const port = 3000;

app.listen(port);
console.log("server started");
//autoriser le body pour les requetes de type POST
app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));
//authoriser l'acces externe
app.use("/api", function(req, res, next){
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PATCH, PUT, POST, GET, DELETE, OPTIONS');
    next();
});
app.use("/api", route);