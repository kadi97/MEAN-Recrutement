const express = require("express");
const app = express();
const route = require("./api/routes/route");

app.listen(3000);
console.log("server started");

app.use("/api", route);