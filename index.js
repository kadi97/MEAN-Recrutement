const express = require("express");
require("./api/data/db");
const app = express();
const route = require("./api/routes/route");

app.listen(3000);
console.log("server started");
//autoriser le body pour les requetes de type POST
app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));

app.use("/api", route);